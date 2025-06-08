<script>
import p5 from "p5";

const grayRamp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const rampLength = grayRamp.length;

export default {
    data() {
        return {
            img: null,
            p: null,
            asciiOutput: "",
        };
    },
    methods: {
        toGrayScale(r, g, b) {
            return 0.21 * r + 0.72 * g + 0.07 * b;
        },
        getCharacterForGrayScale(gray) {
            return grayRamp[Math.floor((gray / 255) * (rampLength - 1))];
        },
        convertToGrayScales(img) {
            img.loadPixels();
            const grayScales = [];

            for (let i = 0; i < img.pixels.length; i += 4) {
                const r = img.pixels[i];
                const g = img.pixels[i + 1];
                const b = img.pixels[i + 2];

                const gray = this.toGrayScale(r, g, b);
                img.pixels[i] = img.pixels[i + 1] = img.pixels[i + 2] = gray;

                grayScales.push(gray);
            }

            img.updatePixels();
            return grayScales;
        },
        drawAscii(grayScales, width) {
            let ascii = "";
            for (let i = 0; i < grayScales.length; i++) {
                ascii += this.getCharacterForGrayScale(grayScales[i]);
                if ((i + 1) % width === 0) ascii += "\n";
            }
            this.asciiOutput = ascii;
        },
        readFile(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const imgSrc = e.target.result;

                this.p.loadImage(imgSrc, (loadedImage) => {
                    this.img = loadedImage;

                    this.p.resizeCanvas(this.img.width, this.img.height);
                    this.p.image(this.img, 0, 0);

                    const grayScales = this.convertToGrayScales(this.img);
                    this.drawAscii(grayScales, this.img.width);
                });
            };
            reader.readAsDataURL(file);
        },
        createCanvas() {
            this.p = new p5((p) => {
                p.setup = () => {
                    p.createCanvas(400, 400);
                    p.background(220);
                };
                p.draw = () => {
                    if (this.img) {
                        p.image(this.img, 0, 0);
                    }
                };
            }, this.$refs.p5Container);
        },
    },
    mounted() {
        this.createCanvas();
    },
    beforeDestroy() {
        if (this.p) this.p.remove();
    },
};
</script>

<template>
    <div>
        <h1>Image to ASCII Generator</h1>
        <p>
            <a href="https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art.html"
                >https://www.jonathan-petitcolas.com/2017/12/28/converting-image-to-ascii-art.html</a
            >
        </p>
        <input type="file" @change="readFile" />
        <div ref="p5Container"></div>
        <pre id="ascii">{{ asciiOutput }}</pre>
    </div>
</template>

<style scoped>
pre#ascii {
    font-family: monospace;
    white-space: pre;
    line-height: 0.6;
    font-size: 7px;
}
</style>
