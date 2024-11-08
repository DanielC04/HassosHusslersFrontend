import React from 'react'
import { Canvas  } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Ground } from './components/Ground'
import Wall from './components/Wall'
import WallStrip from './components/WallStrip'

export default function ModelViewer(props) {
    const wallStrip = [[0, 0], [8, 0], [12, 3], [8, 5], [0, 5]]

    return (
        <div className='w-full h-screen'>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                <WallStrip data={wallStrip} width={0.5} height={4} closeStrip={true}></WallStrip>

               <OrbitControls />
                <Ground></Ground>
            </Canvas>
        </div>
    )
}