import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Color, DoubleSide, EventDispatcher, Mesh, Object3D, PlaneGeometry, REVISION, ShaderMaterial, Vector2 } from 'three';


export function Ground(props) {
    const width = props?.width || 30;
    const height = props.height || 30;

    const ref = useRef()

    useEffect(() => {
        if (ref.current) {
            ref.current.rotateX(-Math.PI / 2); // Rotate 45 degrees on the X-axis
        }
    }, [])

    const { renderer } = useThree()
    useEffect(() => {
        renderer.gammaFactor = 2.2
    }, [])

    return InfiniteGridHelper(0.5, 100);
    //     <mesh {...props} ref={ref}>
    //         <planeGeometry args={[width, height]} position={[width/2., height/2., 0]} />
    //         <meshBasicMaterial color={'grey'} />
    //     </mesh>
    // )
}

class InfiniteGridHelper extends Mesh {
    constructor ( size1, size2, color, distance, axes = 'xzy' ) {
        color = color || new Color( 'white' );
        size1 = size1 || 10;
        size2 = size2 || 100;

        distance = distance || 8000;

        const planeAxes = axes.substr( 0, 2 );
        const geometry = new PlaneBufferGeometry( 2, 2, 1, 1 );
        const material = new ShaderMaterial( {
            side: DoubleSide,
            uniforms: {
                uSize1: {
                    value: size1
                },
                uSize2: {
                    value: size2
                },
                uColor: {
                    value: color
                },
                uDistance: {
                    value: distance
                }
            },
            transparent: true,
            vertexShader: `
        varying vec3 worldPosition;
        uniform float uDistance;
        void main() {
            vec3 pos = position.${axes} * uDistance;
            pos.${planeAxes} += cameraPosition.${planeAxes};
            
            worldPosition = pos;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `,
            fragmentShader: `
        varying vec3 worldPosition;
        
        uniform float uSize1;
        uniform float uSize2;
        uniform vec3 uColor;
        uniform float uDistance;
        
        float getGrid(float size) {
            vec2 r = worldPosition.${planeAxes} / size;
            
            vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
            float line = min(grid.x, grid.y);
            
            return 1.0 - min(line, 1.0);
        }
        
        void main() {
                float d = 1.0 - min(distance(cameraPosition.${planeAxes}, worldPosition.${planeAxes}) / uDistance, 1.0);
            
                float g1 = getGrid(uSize1);
                float g2 = getGrid(uSize2);
                
                gl_FragColor = vec4(uColor.rgb, mix(g2, g1, g1) * pow(d, 3.0));
                gl_FragColor.a = mix(0.5 * gl_FragColor.a, gl_FragColor.a, g2);
            
                if ( gl_FragColor.a <= 0.0 ) discard;
        }
        `,

            extensions: {
                derivatives: true
            }
        } );
        super( geometry, material );
        this.frustumCulled = false;
    }
}
	// Object.assign( InfiniteGridHelper.prototype, THREE.InfiniteGridHelper.prototype );
	// THREE.InfiniteGridHelper = InfiniteGridHelper;