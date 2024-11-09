import { DragControls } from "@react-three/drei";


export function DraggableInstance({ ...props }) {
    return <DragControls autoTransform={true} dragLimits={[[-10, 10], [-10, 10], [0, 0]]}
        onDragStart={() => props.setCameraActive(false)}
        onDragEnd={() => props.setCameraActive(true)}
    >
        {props.children}
    </DragControls>
}
  