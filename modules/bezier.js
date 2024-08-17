import { ball } from "./ball.js";
import { vector } from "./vector.js";

export class bezier {
    constructor() {
        this.line = []
    }

    testing(points, t) {
        let newPoints = [];
        for (let i = 0; i < points.length - 1; i++) {
            newPoints.push(this.lerp(points[i].pos, points[i + 1].pos, t));
        }
        if (newPoints.length === 1) {
            return newPoints[0]; // Return the single vector directly
        } else {
            return this.testing(newPoints, t);
        }
    }

    lerp(p0, p1, t) {
        return new ball((1-t) * p0.x + t*p1.x, (1-t) * p0.y + t*p1.y)         
    }
}