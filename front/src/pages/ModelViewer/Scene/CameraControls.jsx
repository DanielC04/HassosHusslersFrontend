import React, { useEffect, useRef } from 'react'
import { OrbitControls, MapControls, Environment, PointerLockControls, Point } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { Vector3 } from 'three'
extend( {OrbitControls})


export default function CameraControls( { isCameraControlActive } ) {
    const ref = useRef()
    const minPan = new Vector3( - 2, - 2, - 2 );
    const maxPan = new Vector3( 2, 2, 2 );

    useEffect(() => {
        // ref.current.lookAt()
    }, [])

    return (
        <OrbitControls
            enableDamping={true}
            dampingFactor={0.05}
            enableZoom={true}
            zoomSpeed={1.0}
            autoRotate={false}
            autoRotateSpeed={2.0}
            minPolarAngle={Math.PI / 7}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}    // Limits left horizontal rotation to -45 degrees
            maxAzimuthAngle={Math.PI / 4}     // Limits right horizontal rotation to 45 degrees
            // update={() => { scope.target.clamp(minPan, maxPan)}}
            minDistance={2}
            maxDistance={50}
            enabled={isCameraControlActive}
        />
    )
}
