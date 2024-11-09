import React, { useEffect, useRef } from 'react'
import { OrbitControls, MapControls, Environment, PointerLockControls, Point } from '@react-three/drei'
import { extend, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
extend( {OrbitControls})


export default function CameraControls( { isCameraControlActive } ) {
    const ref = useRef()
    const { camera } = useThree()
    const minPan = new Vector3( - 2, - 2, - 2 );
    const maxPan = new Vector3( 2, 2, 2 );

    useEffect(() => {
        camera.position.set(40, 50, 0)
        camera.lookAt(0, 0, 0)
    }, [])

    return (
        <OrbitControls
            enableDamping={true}
            dampingFactor={0.05}
            enableZoom={true}
            zoomSpeed={0.2}
            autoRotate={false}
            autoRotateSpeed={0.2}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            // update={() => { scope.target.clamp(minPan, maxPan)}}
            minDistance={2}
            maxDistance={150}
            enabled={isCameraControlActive}
        />
    )
}
