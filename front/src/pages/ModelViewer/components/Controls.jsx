import { useThree } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from "react";

export function Controls() {
    const orbitControlsRef = useRef()
    const { invalidate, camera, gl } = useThree();
    useEffect(() => {
      orbitControlsRef.current.addEventListener('change', invalidate)
      return () => orbitControlsRef.current.removeEventListener('change', invalidate)
    }, [])
    return <orbitControls ref={orbitControlsRef} args={[camera, gl.domElement]}/>
}