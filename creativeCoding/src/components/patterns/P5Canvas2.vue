<template>
    <div ref="canvasContainer2"></div>
</template>

<script>
import p5 from "p5";

export default {
    name: "P5Canvas2",
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
            this.p = new p5(this.sketch, this.$refs.canvasContainer2);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(500, 500);
                p.background(255);
            };

            p.draw = () => {
                p.noFill();
                p.square(p.mouseX, p.mouseY, p.random(10, 200));
            };
        },
    },
};
</script>

<style scoped></style>
