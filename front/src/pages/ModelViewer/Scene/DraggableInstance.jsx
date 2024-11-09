import { DragControls } from "@react-three/drei";


export function DraggableInstance({ ...props }) {
    const size = props.worldSize / 2.
    return <DragControls autoTransform={true} dragLimits={[[-size, size], [0, 0], [-size, size]]}
        onDragStart={() => props.setCameraActive(false)}
        onDragEnd={() => setTimeout(() => props.setCameraActive(true), 400)}
    >
        {props.children}
    </DragControls>
}
  