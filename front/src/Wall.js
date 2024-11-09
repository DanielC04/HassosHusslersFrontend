import {v4 as uuid} from 'uuid'
import { dist } from './util'

export default class Wall {
    constructor(start, end) {
        this.key = uuid()
        this.start = start
        this.end = end
    }

    midPoint() {
        return [
            (this.start[0] + this.end[0])/2,
            (this.start[1] + this.end[1])/2,
        ]
    }

    length() {
        return dist(this.start, this.end);
    }

    copy() {
        return new Wall(this.start, this.end)
    }
}
