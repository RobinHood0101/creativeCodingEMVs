<template>
    <div ref="image2"></div>
</template>
<script>
import p5 from "p5";

export default {
    name: "image2",
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
            this.p = new p5(this.sketch, this.$refs.image2);
        },
        sketch(p) {
            let img;
            p.preload = () => {
                img = p.loadImage("/ktm_exc.jpg");
                p.pixelDensity(1);
            };
            p.setup = () => {
                p.createCanvas(500, 500);
                img.resize(200, 0);
                img.loadPixels();

                let pixelsData = [];

                for (let y = 0; y < img.height; y++) {
                    for (let x = 0; x < img.width; x++) {
                        let i = (y * img.width + x) * 4;
                        let r = img.pixels[i];
                        let g = img.pixels[i + 1];
                        let b = img.pixels[i + 2];
                        let a = img.pixels[i + 3];

                        let col = p.color(r, g, b);
                        let hue = p.hue(col);
                        let sat = p.saturation(col);
                        let light = p.lightness(col);

                        pixelsData.push({ r, g, b, a, hue, sat, light });
                    }
                }

                // Sort lightness
                pixelsData.sort((a, b) => a.light - b.light);

                // Generate new image
                let sortedImg = p.createImage(img.width, img.height);
                sortedImg.loadPixels();

                for (let i = 0; i < pixelsData.length; i++) {
                    sortedImg.pixels[i * 4] = pixelsData[i].r;
                    sortedImg.pixels[i * 4 + 1] = pixelsData[i].g;
                    sortedImg.pixels[i * 4 + 2] = pixelsData[i].b;
                    sortedImg.pixels[i * 4 + 3] = pixelsData[i].a;
                }

                sortedImg.updatePixels();

                p.image(sortedImg, 0, 0, 500, 500);
            };
        },
    },
};
</script>

<style scoped></style>
