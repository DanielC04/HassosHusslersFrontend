import React, { useEffect, useState } from 'react'
import { Canvas, useThree  } from '@react-three/fiber'
import Elevator from './components/Elevator'
import FloorElement from './Scene/Floor'
import Shaft from './components/Shaft'
import { DraggableInstance } from './Scene/DraggableInstance'
import Floor from '../../Floor'
import CameraControls from './Scene/CameraControls'
import { Grid, Sky } from '@react-three/drei'
import Settings from './components/Settings'

const WORLD_SIZE = 40

export default function ModelViewer(props) {
    const [isCameraControlActive, setCameraControlActive] = useState(true);
    console.log(isCameraControlActive)
    console.log('viewer', props.floors[0])


    // const renderedFloors = Object.keys(props.floors).map((floorIndex) => {
    const renderedFloors = []
    let z = 0;
    for (const floorIndex of Object.keys(props.floors).sort()){
        const floor = props.floors[floorIndex];
        if (!floor) continue;
        renderedFloors.push(<FloorElement key={floorIndex} floor={floor} z={z}/>)
        z += floor.height;
    }

    useEffect(() => {
        // make sure building always is centered in 3D view
        if (!props.floors || props.floors.length == 0) return;
        const groundFloor = props.floors[0];
        if (!groundFloor || !groundFloor.walls) return;
        let totalX = 0;
        let totalY = 0;
        for (let wall of groundFloor.walls) {
            totalX += wall.start[0] + wall.end[0]
            totalY += wall.start[1] + wall.end[1]
        }
        const average_x = totalX / 2 / groundFloor.walls.length;
        const average_y = totalY / 2 / groundFloor.walls.length;
        Floor.offset = [average_x, average_y]
    }, [props.floors])



    if (props?.hidden) return <></>
    // if there's no ground floor: don't render
    if (!props?.floors || !props.floors.hasOwnProperty(0)) return <div>The Ground floor can't be left empty!</div>

    return (
        <div className='w-full h-screen'>
            <Settings></Settings>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Sky distance={450000} sunPosition={[0, 1, 0]} {...props}
                    // turbidity={10}
					// rayleigh={2}
					// mieCoefficient={0.005}
					// mieDirectionalG={0.8}
					inclination={0.49}
					azimuth={0.25}
                />
                {
                    renderedFloors
                }

                <DraggableInstance setCameraActive={setCameraControlActive} worldSize={WORLD_SIZE} >
                    <Elevator setCameraActive={setCameraControlActive}></Elevator>
                </DraggableInstance>

                <DraggableInstance setCameraActive={setCameraControlActive} worldSize={WORLD_SIZE} >
                    <Shaft setCameraActive={setCameraControlActive}></Shaft>
                </DraggableInstance>
                {/* <gridHelper args={[1000, 100]} color={'red'} /> */}
                <Grid 
                    infiniteGrid={true}
                    cellSize={2}
                    sectionSize={20}
                    fadeDistance={400}
                    fadeStrength={5}
                    sectionColor={'#003049'}
                />
                
                {/* <Environment preset='park' background backgroundBlurriness={0.52} /> */}
                <CameraControls isCameraControlActive={isCameraControlActive}/>
            </Canvas>
            <div className='top-2 right-2 m-2 absolute cursor-pointer' onClick={() => props.setPage("editor")}>Back</div>
        </div>
    )
}