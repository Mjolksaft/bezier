import { ball } from './modules/ball.js'
import { bezier } from './modules/bezier.js'
import catmull from './modules/catmull.js'
import {vector} from './modules/vector.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

let curve
let catmullSpline;
let points;
let mousePos = null



window.onload = function() {
    points = [ 
        new ball(400, 100),   // Top-right
        new ball(100, 100),   // Top-left
        new ball(100, 400),   // Bottom-left
        new ball(400, 400),   // Bottom-right
    ];

    curve = new bezier()
    
    points.push(...points.slice(0, 3)); // add the neccessary points to make a loop
    
    catmullSpline = new catmull(points)
    
    draw()
    addEventListener('mousemove', mouse)
    addEventListener('mousedown', mouseClick)


};



function mouse(evt) {
    let x = evt.x - 10
    let y = evt.y - 10
    if (x && y) {
        mousePos = new vector(x,y)
        for (let i = 0; i < points.length; i++) {
            if (points[i].holding) {
                points[i].pos = mousePos
            }
        }
    }
}

function mouseClick(evt) {
    let x = evt.x - 10 // mouse offset
    let y = evt.y - 10
    if (x && y) {
        let pos = new vector(x,y)
        let array = []
        for (let i = 0; i < points.length; i++) {
            let dist = points[i].pos.dist(pos)
            if (dist < 10) {
                array.push({index: i, dist: dist})
            }
        }
        array.sort((a, b) => {return a.dist - b.dist});
        if (array.length > 0) {
            points[array[0].index].holding = points[array[0].index].holding ? false : true 
        }
    }
}

function draw() {

    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,canvas.width, canvas.height)
    
    // for the bezier
    // let bezCurve = []

    // for (let t = 0; t <= 1; t += 0.001) {
    //     bezCurve.push(curve.testing(points,t));
    // }

    // //draw curve
    // ctx.strokeStyle = 'red'
    // ctx.beginPath()
    // ctx.moveTo(bezCurve[0].pos.x, bezCurve[0].pos.y)
    // for (let i = 1; i < bezCurve.length; i++) {
    //     ctx.lineTo(bezCurve[i].pos.x, bezCurve[i].pos.y)
    // }
    // ctx.stroke()

    const splinePoints = catmullSpline.generateSplinePoints(20)
    
    // Draw the spline
    ctx.beginPath();
    ctx.moveTo(splinePoints[0].x, splinePoints[0].y);
    for (let i = 1; i < splinePoints.length; i++) {
        ctx.lineTo(splinePoints[i].x, splinePoints[i].y);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();


    let points = catmullSpline.controlPoints
    // draw controll poitns
    ctx.strokeStyle = 'black'
    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.arc(points[i].pos.x, points[i].pos.y,5,0,Math.PI*2)
        ctx.stroke()
    }

    // //draw line between control points
    // ctx.strokeStyle = 'black'
    // ctx.beginPath()
    // ctx.moveTo(points[0].pos.x, points[0].pos.y)
    // for (let i = 0; i < points.length; i++) {
    //     ctx.lineTo(points[i].pos.x, points[i].pos.y)
    // }
    // ctx.stroke()
    // ctx.closePath()

    requestAnimationFrame(draw)
}
