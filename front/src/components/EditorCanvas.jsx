import { useEffect, useRef } from 'react'

export default function EditorCanvas({walls, w, h, selectedKey, debugPoint}) {
    const canvasRef = useRef()

    function drawPoint(ctx, point) {
        ctx.beginPath();
        const size = 4
        ctx.moveTo(point[0] - size, point[1] - size);
        ctx.lineTo(point[0] + size, point[1] + size);
        ctx.moveTo(point[0] + size, point[1] - size);
        ctx.lineTo(point[0] - size, point[1] + size);
        // ctx.arc(point[0], point[1], 5, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
        ctx.stroke();
    }

    function drawLine(ctx, wall) {
        ctx.beginPath()
        ctx.moveTo(wall.start[0], wall.start[1])
        ctx.lineTo(wall.end[0], wall.end[1])
        ctx.lineWidth = 2;
        ctx.stroke()
    }

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, w, h);
        if (debugPoint) {
            console.log('drawing', debugPoint)
            drawPoint(ctx, debugPoint)
        }
        for (const wall of walls) {
            if (wall.key == selectedKey) {
                ctx.strokeStyle = "red"
                ctx.fillStyle = "red"
            } else {
                ctx.strokeStyle = "#0636e2"
                ctx.fillStyle = "#0636e2"
            }
            drawPoint(ctx, wall.start)
            drawPoint(ctx, wall.end)
            drawLine(ctx, wall)
        }
    }, [walls, h, w, debugPoint])

    return <canvas className='absolute pointer-events-none z-10' width={w} height={h} ref={canvasRef}/>
}
