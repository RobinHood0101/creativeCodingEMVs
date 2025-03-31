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
                p.strokeWeight(2);
  
                const xWidth = p.width/10;
                const yHeight = p.height/10;

                for (let v = 0; v < p.height; v += yHeight) {
                    // horizontal
                    for (let i = 0; i < p.width; i += xWidth) {
                        if (p.random(0, 1) < 0.5) {
                            p.line(i, v, i+xWidth, v+yHeight);
                        } else {
                            p.line(i, v+yHeight, i+xWidth, v);
                        }
                    }
                }
            };

            p.draw = () => {
                
            };

            p.mousePressed = () => {
                console.log("Generated new pattern");
                p.setup();
            }
        }
    }
};
</script>

<style scoped></style>