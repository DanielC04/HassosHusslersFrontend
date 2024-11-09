import React, { useEffect, useState } from 'react'
import { Canvas  } from '@react-three/fiber'
import Elevator from './components/Elevator'
import FloorElement from './Scene/Floor'
import Shaft from './components/Shaft'
import { DraggableInstance } from './Scene/DraggableInstance'
import Floor from '../../Floor'
import CameraControls from './Scene/CameraControls'

const WORLD_SIZE = 40

export default function ModelViewer(props) {
    // const wallStrip = [[0, 0], [8, 0], [12, 3], [8, 5], [0, 5]]
    const [isCameraControlActive, setCameraControlActive] = useState(true);
    console.log(isCameraControlActive)
    console.log('viewer', props.floors[0])


    // const renderedFloors = Object.keys(props.floors).map((floorIndex) => {
    const renderedFloors = []
    let z = 0;
    for (const floorIndex of Object.keys(props.floors).sort()){
        const floor = props.floors[floorIndex];
        renderedFloors.push(<FloorElement key={floorIndex} floor={floor} z={z}/>)
        z += floor.height;
    }

    useEffect(() => {
        // make sure building always is centered in 3D view
        const groundFloor = props.floors[0];
        let totalX = 0;
        let totalY = 0;
        for (let wall of groundFloor.walls) {
            totalX += wall.start[0] + wall.end[0]
            totalY += wall.start[1] + wall.end[1]
        }
        const average_x = totalX / 2 / groundFloor.walls.length;
        const average_y = totalY / 2 / groundFloor.walls.length;
        Floor.offset = [average_x, average_y]
    }, [])


    return (
        <div className='w-full h-screen'>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[WORLD_SIZE/2, WORLD_SIZE/2, WORLD_SIZE/2]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                {
                    renderedFloors
                }

                <DraggableInstance setCameraActive={setCameraControlActive} worldSize={WORLD_SIZE} >
                    <Elevator setCameraActive={setCameraControlActive}></Elevator>
                </DraggableInstance>

                <DraggableInstance setCameraActive={setCameraControlActive} worldSize={WORLD_SIZE} >
                    <Shaft setCameraActive={setCameraControlActive}></Shaft>
                </DraggableInstance>
                <gridHelper />
                
                {/* <Environment preset='park' background backgroundBlurriness={0.52} /> */}
                <CameraControls isCameraControlActive={isCameraControlActive}/>
            </Canvas>
            <div className='top-0 left-0 m-2 absolute cursor-pointer' onClick={() => props.setPage("editor")}>Back</div>
        </div>
    )
}