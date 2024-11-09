import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
// import { DraggableInstance } from "./DraggableInstance";
import { DragControls } from "@react-three/drei";

export default function Elevator(props) {
  const { nodes, materials } = useGLTF("/assets/elevator.gltf");
  return (
    <DragControls autoTransform={true} dragLimits={[[-5, 5], [-5, 5], [0, 0]]}
        onDragStart={() => props.setCameraActive(false)}
        onDragEnd={() => props.setCameraActive(true)}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.elevator.geometry}
        material={materials["M_Model"]}
        rotation={[degToRad(90), degToRad(0), 0]}
        scale={2}
      >
            <meshBasicMaterial color={'darkblue'} wireframe={true} />
        </mesh>
    </DragControls>
  );
}

useGLTF.preload("/assets/elevator.gltf");