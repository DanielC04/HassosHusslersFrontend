import React, { useState } from 'react'
import { Canvas  } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Ground } from './components/Ground'
import WallStrip from './components/WallStrip'
import Elevator from './components/Elevator'
import Shaft from './components/Shaft'
import { DraggableInstance } from './components/DraggableInstance'

export default function ModelViewer(props) {
    const wallStrip = [[0, 0], [8, 0], [12, 3], [8, 5], [0, 5]]
    const [isCameraControlActive, setCameraControlActive] = useState(true);
    console.log(isCameraControlActive)

    return (
        <div className='w-full h-screen'>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                <WallStrip data={wallStrip} width={0.5} height={4} closeStrip={true}></WallStrip>
                <Elevator setCameraActive={setCameraControlActive}></Elevator>
                <DraggableInstance setCameraActive={setCameraControlActive} >
                    <Shaft setCameraActive={setCameraControlActive}></Shaft>
                </DraggableInstance>

                <OrbitControls
                    enableDamping={true}
                    dampingFactor={0.05}
                    enableZoom={true}
                    zoomSpeed={1.0}
                    autoRotate={false}
                    autoRotateSpeed={2.0}
                    // maxPolarAngle={Math.PI / 2}
                    minDistance={2}
                    maxDistance={50}
                    enabled={isCameraControlActive}/>
                <Ground></Ground>
            </Canvas>
        </div>
    )
}