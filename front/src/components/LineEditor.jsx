import { useEffect, useState, useRef } from 'react'
import FloorTest from '../assets/floortest.svg'
import EditorCanvas from './EditorCanvas'
import Wall from '../Wall'
import { dist, clamp, distanceToLineSegment } from '../util'
import BeatLoader from 'react-spinners/BeatLoader'

const WIDTH = 1400
const HEIGHT = 700

export default function LineEditor({ walls, setWalls, planSvg }) {
    // const [walls, setWalls] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [selectedKey, setSelectedKey] = useState()
    const [hasLoaded, setHasLoaded] = useState(false)
    const [zoom, setZoom] = useState(1.0)
    const [debugPoint, setDebugPoint] = useState()
    const imgRef = useRef()
    const wrapperRef = useRef()

    function renderSvgToImg(svgFile, imgElement) {
        if (!(svgFile instanceof Blob)) {
            console.error("Input is not a Blob or File object");
            return;
        }
    
        const reader = new FileReader();
        
        reader.onload = function(event) {
            imgElement.src = event.target.result;
        };
    
        reader.onerror = function(error) {
            console.error("Error reading SVG file:", error);
        };
    
        reader.readAsDataURL(svgFile);
    }

    const getCoords = (e) => {
        // https://stackoverflow.com/a/42111623/10666216
        let rect = wrapperRef.current.getBoundingClientRect();
        let x = (e.clientX - rect.left) / zoom; //x position within the element.
        let y = (e.clientY - rect.top) / zoom;  //y position within the element.
        return [x,y]
    }

    const handleMouseUp = (e) => {
        const lastWall = walls[walls.length-1]
        if (lastWall.length() < 10) {
            // click
            const newWalls = walls.filter(wall => wall.key != lastWall.key)
            setWalls(newWalls)
            const mouse = getCoords(e)
            // let minDist = 0
            // let closestKey = null
            // walls.forEach(wall => {
            //     if (wall.key != lastWall.key) {
            //         const mouseDist = dist(mouse, wall.midPoint())
            //         if (mouseDist < minDist || closestKey==null) {
            //             closestKey = wall.key
            //             minDist = mouseDist
            //         }
            //     }
            // })
            // setSelectedKey(closestKey)
            let found = false
            for (const wall of newWalls) {
                if (distanceToLineSegment(mouse, wall.start, wall.end) < 20) {
                    setSelectedKey(wall.key)
                    found = true
                    break
                }
            }
            if (!found) setSelectedKey()
        }
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            setWalls(walls.map((wall, i) => {
                if (i == walls.length-1) {
                    let draggedWall = wall.copy()
                    draggedWall.end = getCoords(e)
                    return draggedWall
                } else {
                    return wall
                }
            }))
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        const coords = getCoords(e)
        setWalls([...walls, new Wall(coords, coords)])
    }

    const selectedWall = () => {
        return walls.find(w => w.key == selectedKey)
    }

    const deleteSelected = (e) => {
        e.stopPropagation()
        setWalls(walls.filter(w => w.key != selectedKey))
        setSelectedKey()
    }

    const handleScroll = (e) => {
        const newZoom = clamp(zoom-(e.deltaY / 1000), 0.5, 2.0)
        setZoom(newZoom)
    }

    useEffect(() => {
        renderSvgToImg(planSvg, imgRef.current)
    }, [planSvg])

    useEffect(() => {
        // make request to backend server to predict walls
        const formData = new FormData();
        formData.append('file', planSvg);

        fetch('http://localhost:5000/predict_walls', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Process the response data
            console.log('fetched data', data);
            if (!data || !data.walls) {
                throw new Error('Invalid response from server');
            }
            // const scaleFactor = imgRef.current.width / 1000
            const scaleFactor = 0.95
            const offset = [90, -7]
            setWalls(data.walls.map(wall => 
                new Wall(
                    [wall[0][0]*scaleFactor + offset[0], wall[0][1]*scaleFactor + offset[1]],
                    [wall[1][0]*scaleFactor + offset[0], wall[1][1]*scaleFactor + offset[1]]
                )
            ));
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, [])

    return (
        <div 
            className="flex relative overflow-clip"
            style={{ width: WIDTH, height: HEIGHT }}
            onWheel={handleScroll}
        >
            { !hasLoaded &&
                <BeatLoader className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-slate-700' size={20} />
            }
            <div 
                ref={wrapperRef} 
                style={{ width: WIDTH, height: HEIGHT, transform: `scale(${zoom})`}} 
                onMouseDown={handleMouseDown} 
                onMouseUp={handleMouseUp} 
                onMouseMove={handleMouseMove}
            >
                <EditorCanvas w={WIDTH} h={HEIGHT} walls={walls} selectedKey={selectedKey} debugPoint={debugPoint}/>
                <img 
                    className={`absolute max-h-full max-w-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] ${hasLoaded ? 'visible' : 'invisible'} pointer-events-none`} 
                    ref={imgRef} 
                    onLoad={()=>setHasLoaded(true)}
                />
                { selectedWall() &&
                    <button
                        style={{ 
                            left: selectedWall().midPoint()[0] + 10,
                            top: selectedWall().midPoint()[1] + 10,
                        }}
                        onMouseUp={deleteSelected} 
                        onMouseDown={e => e.stopPropagation()}
                        className='absolute bg-red-600 text-white p-1 rounded z-20'
                    >
                        Delete
                    </button>
                }
        </div>
    </div>
    )
}
