import { useGLTF } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";

export default function Elevator(props) {
  const { nodes, materials } = useGLTF("/assets/elevator.gltf");
  return (
     <mesh
        castShadow
        receiveShadow
        geometry={nodes.elevator.geometry}
        material={materials["M_Model"]}
        rotation={[0, 0, 0]}
        scale={2}
      >
            <meshBasicMaterial color={'#44484b'} wireframe={true} />
        </mesh>
  );
}

useGLTF.preload("/assets/elevator.gltf");