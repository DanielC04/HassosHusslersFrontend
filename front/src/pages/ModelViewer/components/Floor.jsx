import React, { useEffect, useState } from 'react'
import Wall from './Wall'
import { Vector3 } from 'three';
import { extend } from '@react-three/fiber'
import { ConvexGeometry } from 'three/examples/jsm/Addons.js';

extend({ ConvexGeometry });

export default function Floor({ walls, width, height, z}) {

    const [hullGeometry, setHullGeometry] = useState(null);

    if (!width) width = 0.2;
    if (!height) height = 5;

    useEffect(() => {
        // if (z !== 0) return;
        const pointsForConvexHull = [];
        for (let wall of walls){
            pointsForConvexHull.push(new Vector3(wall.start[0], 0, wall.start[1]));
            pointsForConvexHull.push(new Vector3(wall.end[0], 0.1, wall.end[1]))
        }

        const convexHull = new ConvexGeometry(pointsForConvexHull);
        setHullGeometry(convexHull);
    }, [])

    return (
        <>
            {
                // z == 0 && 
                <mesh geometry={hullGeometry}>
                    <meshBasicMaterial color={'grey'} />
                </mesh>
            }
            { walls.map(wall => {
                return <Wall key={wall.key} p1={wall.start} p2={wall.end} width={width} height={height} z={z}/>
            })}
        </>
    )
}