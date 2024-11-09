export default class Floor {
    constructor() {
        this.walls = []
        this.height = 2.0
        this.scale = 0.1 // coordInMeters = coordInPixels * scale
        if (!Floor.offset) Floor.offset = [0, 0]
    }

    pixelToMeter(point) {
        return [(point[0] - Floor.offset[0])*this.scale, (point[1] - Floor.offset[1])*this.scale]
    }
}
