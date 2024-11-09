import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export function Ground(props) {
    const width = props?.width || 30;
    const height = props.height || 30;

    const ref = useRef()
    return (
        <mesh
        {...props}
        ref={ref}>
            <planeGeometry args={[width, height]} position={[width/2., height/2., 0]} />
            <meshBasicMaterial color={'grey'} />
        </mesh>
    )
}