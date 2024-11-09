export default class Floor {
    constructor() {
        this.walls = []
        this.height = 2.0
        this.scale = 0.1 // coordInMeters = coordInPixels * scale
    }

    pixelToMeter(point) {
        return [point[0]*this.scale, point[1]*this.scale]
    }
}
