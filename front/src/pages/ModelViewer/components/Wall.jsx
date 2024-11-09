import React, { useEffect, useRef, useState } from 'react'

export default function Wall(props) {
    const width = props?.width || 1;
    const height = props?.height || 10;
    const [x1, y1] = props.p1;
    const [x2, y2] = props.p2;
    const dimensions = [width, height, ((x1 - x2)**2 + (y1 - y2)**2)**0.5];
    const position = [(x1 + x2) / 2., height / 2., (y1 + y2)/2.]
    const rotationAngle = Math.atan2(x1 - x2, y1 - y2);
    const ref = useRef()

    useEffect(() => {
        if (ref.current) ref.current.rotateY(rotationAngle)
    }, [])

    return (
        <mesh
            {...props}
            ref={ref}
            position={position}
        >
            <boxGeometry args={dimensions} />
            <meshPhongMaterial color="#44484b" opacity={0.5} transparent />
        </mesh>
    )
}