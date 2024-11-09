import { DragControls } from "@react-three/drei";


export function DraggableInstance({ ...props }) {
<<<<<<< HEAD
    return <DragControls autoTransform={true} dragLimits={[[-10, 10], [-10, 10], [0, 0]]}
        onDragStart={() => props.setCameraActive(false)}
        onDragEnd={() => props.setCameraActive(true)}
=======
    const size = props.worldSize / 2.
    return <DragControls autoTransform={true} dragLimits={[[-size, size], [0, 0], [-size, size]]}
        onDragStart={() => props.setCameraActive(false)}
        onDragEnd={() => setTimeout(() => props.setCameraActive(true), 400)}
>>>>>>> 6e5cc3f (rotated world by 90deg)
    >
        {props.children}
    </DragControls>
}
  