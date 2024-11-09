import { useGLTF } from "@react-three/drei";
<<<<<<< HEAD
import { useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
// import { DraggableInstance } from "./DraggableInstance";
import { DragControls } from "@react-three/drei";
=======
import { degToRad } from "three/src/math/MathUtils.js";
>>>>>>> 6e5cc3f (rotated world by 90deg)

export default function Elevator(props) {
  const { nodes, materials } = useGLTF("/assets/elevator.gltf");
  return (
<<<<<<< HEAD
    <DragControls autoTransform={true} dragLimits={[[-5, 5], [-5, 5], [0, 0]]}
        onDragStart={() => props.setCameraActive(false)}
        onDragEnd={() => props.setCameraActive(true)}
    >
      <mesh
=======
     <mesh
>>>>>>> 6e5cc3f (rotated world by 90deg)
        castShadow
        receiveShadow
        geometry={nodes.elevator.geometry}
        material={materials["M_Model"]}
<<<<<<< HEAD
        rotation={[degToRad(90), degToRad(0), 0]}
=======
        rotation={[0, 0, 0]}
>>>>>>> 6e5cc3f (rotated world by 90deg)
        scale={2}
      >
            <meshBasicMaterial color={'darkblue'} wireframe={true} />
        </mesh>
<<<<<<< HEAD
    </DragControls>
=======
>>>>>>> 6e5cc3f (rotated world by 90deg)
  );
}

useGLTF.preload("/assets/elevator.gltf");