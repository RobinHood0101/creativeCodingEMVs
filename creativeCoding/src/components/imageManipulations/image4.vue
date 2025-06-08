<template>
    <div ref="image4"></div>
</template>

<script>
import p5 from "p5";

export default {
    name: "image4",
    data() {
        return {};
    },
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
            this.p = new p5(this.sketch, this.$refs.image4);
        },
        sketch(p) {
            let img;
            let glitched = [];

            p.preload = () => {
                img = p.loadImage("/ktm_exc.jpg");
            };

            p.setup = () => {
                p.createCanvas(400, 400);
                img.loadPixels();
                img.resize(400, 400);
                p.image(img, 0, 0);
            };

            p.draw = () => {
                p.image(img, 0, 0);

                // Glitch-Effect
                for (let i = 0; i < 5; i++) {
                    let y = p.floor(p.random(img.height));
                    let h = p.floor(p.random(5, 20));
                    let xOffset = p.floor(p.random(-20, 20));
                    p.copy(img, 0, y, img.width, h, xOffset, y, img.width, h);
                }
            };
        },
    },
};
</script>

<style scoped></style>
