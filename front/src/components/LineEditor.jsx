import { useEffect, useState, useRef } from 'react'
import FloorTest from '../assets/floortest.svg'
import EditorCanvas from './EditorCanvas'
import { dist } from '../util'
import Wall from '../Wall'

export default function LineEditor() {
    // const [walls, setWalls] = useState([])
    // const [selectedWall, setSelectedWall] = useState()
    const walls = useRef([])

    // console.log('render', walls)

    function getCoords(e) {
        // https://stackoverflow.com/a/42111623/10666216
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        return [x,y]
    }

    function handleMouseUp(e) {
        // if (tempWall.current.length() < 10) {
            // click
            // console.log('click')
            // const coords = getCoords(e)
            // let minDist = 0
            // let nearestWall = null
            // for (const wall of walls) {
            //     let mid = wall.midPoint()
            //     let d = dist(mid, coords)
            //     if (d < minDist || !nearestWall) {
            //         nearestWall = wall
            //         minDist = d
            //     }
            // }
            // if (nearestWall) {
            //     setSelectedWall(nearestWall.key)
            // }
        // } else {
            // drag
            // console.log('drag', walls, [...walls, tempWall.current])
            // setWalls([...walls, tempWall.current])
        // }
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    function handleMouseMove(e) {
        console.log('move', walls.current)
        let coords = getCoords(e)
        walls.current[walls.current.length-1].end = coords
        // setWalls(walls.map(w => {
        //     if (w.key == selectedWall) {
        //         w.end = coords
        //     }
        //     return w
        // }))
        // walls[0].end = coords
        // tempWall.current.end = coords
    }

    function handleMouseDown(e) {
        let coords = getCoords(e)
        const newWall = new Wall(coords, coords)
        // tempWall.current = newWall
        console.log('setting', walls.current)
        // setWalls([...walls, newWall])
        walls.current.push(newWall)
        document.addEventListener('mousemove', handleMouseMove) // use capture? 
        document.addEventListener('mouseup', handleMouseUp)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [])

    return <div className="h-[500px] w-[500px] flex relative">
        {/* <EditorCanvas w={500} h={500} walls={walls} selected={selectedWall} /> */}
        <img className="flex-1" src={FloorTest} />
    </div>
}
