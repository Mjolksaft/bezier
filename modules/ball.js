import { vector } from "./vector.js"

export class ball {
    constructor(x,y) {
        this.pos = new vector(x,y)
        this.holding = false
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 7, 0, Math.PI * 2)
        ctx.stroke();
    }
}