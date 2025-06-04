<template>
    <div ref="canvasContainer4"></div>
</template>

<script>
import p5 from "p5";

export default {
    name: "P5Canvas4",
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
            this.p = new p5(this.sketch, this.$refs.canvasContainer4);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(500, 500);
                p.background(255);

                const xWidth = p.width / 10;
                const yHeight = p.height / 10;

                for (let v = 0; v < p.height; v += yHeight) {
                    // horizontal
                    for (let i = 0; i < p.width; i += xWidth) {
                        p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
                        p.circle(i + xWidth / 2, v + yHeight / 2, p.random(0, 50));
                    }
                }
            };

            p.draw = () => {};

            p.mousePressed = () => {
                p.setup();
            };
        },
    },
};
</script>

<style scoped></style>
