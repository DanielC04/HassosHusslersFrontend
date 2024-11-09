export function dist(a, b) {
    const out = Math.sqrt(
        Math.pow(a[0] - b[0], 2)
        + Math.pow(a[1] - b[1], 2)
    )
    return out
}

export function clamp(num, min, max) {
    if (num < min) return min
    if (num > max) return max
    return num
}

export function distanceToLineSegment(point, lineStart, lineEnd) {
    const [px, py] = point;
    const [sx, sy] = lineStart;
    const [ex, ey] = lineEnd;

    // Calculate the square of the length of the line segment
    const lineLengthSquared = (ex - sx) ** 2 + (ey - sy) ** 2;

    // If the line segment's length is zero, return the distance to the start point
    if (lineLengthSquared === 0) {
        return Math.hypot(px - sx, py - sy);
    }

    // Project the point onto the line segment, clamping t to the range [0, 1]
    let t = ((px - sx) * (ex - sx) + (py - sy) * (ey - sy)) / lineLengthSquared;
    t = Math.max(0, Math.min(1, t));

    // Find the closest point on the line segment
    const closestX = sx + t * (ex - sx);
    const closestY = sy + t * (ey - sy);

    // Calculate the distance from the point to the closest point on the line segment
    return Math.hypot(px - closestX, py - closestY);
}
