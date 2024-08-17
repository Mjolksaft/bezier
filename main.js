import { ball } from './modules/ball.js'
import { bezier } from './modules/bezier.js'
import {vector} from './modules/vector.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 500
canvas.height = 500

let curve
let mousePos = null

window.onload = function() {
    curve = new bezier()
    draw()
    addEventListener('mousemove', mouse)
    addEventListener('mousedown', mouseClick)
};
let points = [ 
    new ball(240,250), 
    new ball(400,100),
    new ball(100,100),
    new ball(260,250),
    new ball(260,250),
];

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
    
    let bezCurve = []

    for (let t = 0; t <= 1; t += 0.001) {
        bezCurve.push(curve.testing(points,t));
    }

    //draw curve
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(bezCurve[0].pos.x, bezCurve[0].pos.y)
    for (let i = 1; i < bezCurve.length; i++) {
        ctx.lineTo(bezCurve[i].pos.x, bezCurve[i].pos.y)
    }
    ctx.stroke()

    // draw controll poitns
    ctx.strokeStyle = 'black'
    for (let i = 0; i < points.length; i++) {
        ctx.beginPath()
        ctx.arc(points[i].pos.x,points[i].pos.y,5,0,Math.PI*2)
        ctx.stroke()
    }

    //draw line between control points
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(points[0].pos.x, points[0].pos.y)
    for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].pos.x, points[i].pos.y)
    }
    ctx.stroke()
    ctx.closePath()

    requestAnimationFrame(draw)
}
