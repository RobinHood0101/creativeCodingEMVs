<template>
    <div ref="agent1"></div>
</template>

<script>
import p5 from "p5";

const amountOfFormPoints = 5;
const stepSize = 2;
const initRadius = 150;
const mouseAttraction = 0.01;
let centerX, centerY;
let x = [];
let y = [];

export default {
    name: "agent1",
    mounted() {
        this.createCanvas();
    },
    beforeDestroy() {
        if (this.p) {
            this.p.remove();
        }
    },
    methods: {
        createCanvas() {
            this.p = new p5(this.sketch, this.$refs.agent1);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(700, 700);
                centerX = p.width / 2;
                centerY = p.width / 2;
                const angle = p.radians(360 / amountOfFormPoints);
                for (let i = 0; i < amountOfFormPoints; i++) {
                    x.push(p.cos(angle * i) * initRadius);
                    y.push(p.sin(angle * i) * initRadius);
                }

                p.stroke(0, 75);
                p.strokeWeight(0.5);
                p.background(255);
                p.noFill();
            };

            p.draw = () => {
                centerX += (p.mouseX - centerX) * mouseAttraction;
                centerY += (p.mouseY - centerY) * mouseAttraction;

                for (let i = 0; i < amountOfFormPoints; i++) {
                    x[i] += p.random(-stepSize, stepSize);
                    y[i] += p.random(-stepSize, stepSize);
                    p.ellipse(x[i] + centerX, y[i] + centerY, 5, 5);
                }

                p.beginShape();
                p.curveVertex(x[0], centerX, y[0] + centerY);

                for (let i = 0; i < amountOfFormPoints; i++) {
                    p.curveVertex(x[i] + centerX, y[i] + centerY);
                }

                p.curveVertex(x[0] + centerX, y[0] + centerY);

                p.curveVertex(x[amountOfFormPoints - 1] + centerX, y[amountOfFormPoints - 1] + centerY);

                p.endShape();
            };

            p.mousePressed = () => {
                p.setup();
            };
        },
    },
};
</script>

<style scoped></style>
