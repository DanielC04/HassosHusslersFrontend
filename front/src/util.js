export function dist(a, b) {
    const out = Math.sqrt(
        Math.pow(a[0] - b[0], 2)
        + Math.pow(a[1] - b[1], 2)
    )
    return out
}
