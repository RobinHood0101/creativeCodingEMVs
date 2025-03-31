<template>
    <div ref="canvasContainer"></div>
</template>

<script>
import p5 from 'p5';

export default {
    name: 'P5Canvas3',
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
            this.p = new p5(this.sketch, this.$refs.canvasContainer);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(500, 500);
                p.background(255);
            };

            p.draw = () => {

            };

            p.mousePressed = () => {
                console.log("Mouse pressed");
            }
        }
    }
};
</script>

<style scoped></style>