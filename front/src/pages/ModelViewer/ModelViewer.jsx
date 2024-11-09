import React, { useState } from 'react'
import { Canvas  } from '@react-three/fiber'
import { OrbitControls, MapControls, Environment } from '@react-three/drei'
import { Ground } from './components/Ground'
import WallStrip from './components/WallStrip'
import Elevator from './components/Elevator'
import FloorElement from './components/Floor'
import Shaft from './components/Shaft'
import { DraggableInstance } from './components/DraggableInstance'
import Wall from './components/Wall'


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
                
                <Environment preset='park' background backgroundBlurriness={0.52} />

                <MapControls
                    enabled={isCameraControlActive}
                    position0={[10, 10, 10]}
                    zoom0={0.10}
                 />
                {/* <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.05}
                    enableZoom={true}
                    zoomSpeed={1.0}
                    autoRotate={false}
                    autoRotateSpeed={2.0}
                    // maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Math.PI / 4}    // Limits left horizontal rotation to -45 degrees
                    maxAzimuthAngle={Math.PI / 4}     // Limits right horizontal rotation to 45 degrees
                    minDistance={2}
                    maxDistance={50}
                    enabled={isCameraControlActive}/> */}
                {/* <Ground width={WORLD_SIZE} height={WORLD_SIZE}></Ground> */}
            </Canvas>
            <div className='top-0 left-0 m-2 absolute cursor-pointer' onClick={() => props.setPage("editor")}>Back</div>
        </div>
    )
}