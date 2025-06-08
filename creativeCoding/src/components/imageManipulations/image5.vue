<template>
    <div ref="image5"></div>
</template>
<script>
import p5 from "p5";

export default {
    name: "image5",
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
            this.p = new p5(this.sketch, this.$refs.image5);
        },
        sketch(p) {
            let img;

            p.preload = () => {
                img = p.loadImage("/ktm_exc.jpg");
            };

            p.setup = () => {
                p.createCanvas(400, 400);
                img.resize(400, 400);
                img.loadPixels();

                // Dithering
                for (let y = 0; y < img.height; y++) {
                    for (let x = 0; x < img.width; x++) {
                        let index = (x + y * img.width) * 4;
                        let r = img.pixels[index];
                        let g = img.pixels[index + 1];
                        let b = img.pixels[index + 2];
                        let brightness = (r + g + b) / 3;

                        let rand = p.random(255);

                        let value = brightness > rand ? 255 : 0;

                        img.pixels[index] = value;
                        img.pixels[index + 1] = value;
                        img.pixels[index + 2] = value;
                        img.pixels[index + 3] = 255;
                    }
                }

                img.updatePixels();
                p.image(img, 0, 0);
            };
        },
    },
};
</script>

<style scoped></style>
