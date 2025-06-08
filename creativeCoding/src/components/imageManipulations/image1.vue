<template>
    <div ref="image1"></div>
</template>
<script>
import p5 from "p5";

export default {
    name: "image1",
    data() {
        return {
            rgb: {
                red: 0,
                green: 0,
                blue: 0,
            },
        };
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
            this.p = new p5(this.sketch, this.$refs.image1);
        },
        sketch(p) {
            let img;
            p.preload = () => {
                img = p.loadImage("/ktm.jpg");
                p.pixelDensity(1);
            };
            p.setup = () => {
                p.createCanvas(500, 500);
                p.image(img, 0, 0, 500, 400);

                p.describe("Test");
            };

            p.draw = () => {
                p.background(0);
                p.image(img, 0, 0, 500, 400);
                img.loadPixels();

                // or index = (x + y * width) * 4;
                for (let i = 0; i < img.pixels.length; i += 4) {
                    let red = img.pixels[i + 0];
                    let blue = img.pixels[i + 1];
                    let green = img.pixels[i + 2];
                    let alpha = img.pixels[i + 3];

                    let sum = red + blue + green + alpha;

                    if (sum < img.pixels[i + 4] + img.pixels[i + 5] + img.pixels[i + 6] + img.pixels[i + 7]) {
                        img.pixels[i + 0] = img.pixels[i + 4];
                        img.pixels[i + 4] = red;
                        img.pixels[i + 1] = img.pixels[i + 5];
                        img.pixels[i + 5] = green;
                        img.pixels[i + 2] = img.pixels[i + 6];
                        img.pixels[i + 6] = blue;
                        img.pixels[i + 3] = img.pixels[i + 7];
                        img.pixels[i + 7] = alpha;
                    }
                }
                img.updatePixels();
            };
        },
    },
};
</script>

<style scoped></style>
