import React, { useEffect, useState } from 'react'
import Wall from '../components/Wall'
import { Vector3 } from 'three';
import { extend } from '@react-three/fiber'
import { ConvexGeometry } from 'three/examples/jsm/Addons.js';
import Floor from '../../../Floor';

extend({ ConvexGeometry });

export default function FloorElement({ floor, width, z}) {

    const [hullGeometry, setHullGeometry] = useState(null);

    if (!width) width = 0.2;
    const walls = floor.walls;

    useEffect(() => {
        if (z !== 0) return;
        const pointsForConvexHull = [];
        for (let wall of walls){
            const start = floor.pixelToMeter(wall.start)
            const end = floor.pixelToMeter(wall.end)
            pointsForConvexHull.push(new Vector3(start[0], 0, start[1]));
            pointsForConvexHull.push(new Vector3(end[0], 0.1, end[1]))
        }

        const convexHull = new ConvexGeometry(pointsForConvexHull);
        setHullGeometry(convexHull);
    }, [])

    return (
        <>
            {
                z == 0 && hullGeometry &&
                <mesh geometry={hullGeometry}>
                    <meshBasicMaterial color={'grey'} />
                </mesh>
            }
            { walls.map(wall => {
                const start = floor.pixelToMeter(wall.start);
                const end = floor.pixelToMeter(wall.end);
                return <Wall key={wall.key} p1={start} p2={end} width={width} height={floor.height * 3} z={z*3}/>
            })}
        </>
    )
}