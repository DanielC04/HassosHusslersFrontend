import { useEffect, useRef } from 'react'

export default function EditorCanvas({walls, w, h, selectedKey}) {
    const canvasRef = useRef()

    function drawPoint(ctx, point) {
        ctx.beginPath();
        ctx.arc(point[0], point[1], 2, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
        ctx.fill();
    }

    function drawLine(ctx, wall) {
        ctx.beginPath()
        ctx.moveTo(wall.start[0], wall.start[1])
        ctx.lineTo(wall.end[0], wall.end[1])
        ctx.lineWidth = 5;
        ctx.stroke()
    }

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, w, h);
        for (const wall of walls) {
            if (wall.key == selectedKey) {
                ctx.strokeStyle = "red"
                ctx.fillStyle = "red"
            } else {
                ctx.strokeStyle = "black"
                ctx.fillStyle = "black"
            }
            drawPoint(ctx, wall.start)
            drawPoint(ctx, wall.end)
            drawLine(ctx, wall)
        }
    }, [walls, h, w])

    return <canvas className='absolute' width={w} height={h} ref={canvasRef}/>
}
