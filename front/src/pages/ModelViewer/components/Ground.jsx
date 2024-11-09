import React, { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export function Ground(props) {
    const width = props?.width || 30;
    const height = props.height || 30;

    const ref = useRef()

    useEffect(() => {
        if (ref.current) {
<<<<<<< HEAD
            // ref.current.rotateX(Math.PI / 2); // Rotate 45 degrees on the X-axis
=======
            ref.current.rotateX(-Math.PI / 2); // Rotate 45 degrees on the X-axis
>>>>>>> 6e5cc3f (rotated world by 90deg)
        }
    }, [])

    return (
<<<<<<< HEAD
        <mesh
        {...props}
        ref={ref}>
=======
        <mesh {...props} ref={ref}>
>>>>>>> 6e5cc3f (rotated world by 90deg)
            <planeGeometry args={[width, height]} position={[width/2., height/2., 0]} />
            <meshBasicMaterial color={'grey'} />
        </mesh>
    )
}