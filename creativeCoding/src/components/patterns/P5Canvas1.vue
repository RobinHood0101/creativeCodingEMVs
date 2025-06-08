<template>
    <div ref="canvasContainer1"></div>
</template>

<script>
import p5 from "p5";

export default {
    name: "P5Canvas3",
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
            this.p = new p5(this.sketch, this.$refs.canvasContainer1);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(500, 500);
                p.background(255);

                const xWidth = p.width / 4;
                const yHeight = p.height / 4;

                // Create Grid
                for (let y = 0; y < p.height; y += yHeight) {
                    // horizontal
                    for (let x = 0; x < p.width; x += xWidth) {
                        p.noFill();
                        p.square(x, y, xWidth);

                        // in square
                        let squares = [
                            {
                                x: 0,
                                y: 0,
                                width: 100,
                                height: 40,
                            },
                            {
                                x: 100,
                                y: 0,
                                width: 25,
                                height: 125,
                            },
                            {
                                x: 0,
                                y: 40,
                                width: 100,
                                height: 30,
                            },
                        ];

                        squares.forEach((square) => {
                            p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
                            p.rect(square.x, square.y, square.width, square.height);
                        });
                    }
                }
            };

            p.draw = () => {};
        },
    },
};
</script>

<style scoped></style>
