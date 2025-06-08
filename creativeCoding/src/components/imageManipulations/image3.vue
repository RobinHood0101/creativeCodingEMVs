<template>
    <div ref="image3"></div>
</template>
<script>
import p5 from "p5";

export default {
    name: "image3",
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
            this.p = new p5(this.sketch, this.$refs.image3);
        },
        sketch(p) {
            let imgA, imgB, mixed;

            p.preload = () => {
                imgA = p.loadImage("/ktm_exc.jpg");
                imgB = p.loadImage("/ktm.jpg");
            };
            p.setup = () => {
                p.createCanvas(400, 400);

                imgA.resize(400, 400);
                imgB.resize(400, 400);

                imgA.loadPixels();
                imgB.loadPixels();

                mixed = p.createImage(400, 400);
                mixed.loadPixels();

                for (let i = 0; i < imgA.pixels.length; i += 4) {
                    let useA = (i / 4) % 2 === 1;

                    mixed.pixels[i + 0] = useA ? imgA.pixels[i + 0] : imgB.pixels[i + 0]; // R
                    mixed.pixels[i + 1] = useA ? imgA.pixels[i + 1] : imgB.pixels[i + 1]; // G
                    mixed.pixels[i + 2] = useA ? imgA.pixels[i + 2] : imgB.pixels[i + 2]; // B
                    mixed.pixels[i + 3] = 255; // A
                }

                mixed.updatePixels();

                p.image(mixed, 0, 0);
            };
        },
    },
};
</script>

<style scoped></style>
