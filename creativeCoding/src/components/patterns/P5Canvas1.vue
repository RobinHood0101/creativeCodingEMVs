<template>
    <div ref="canvasContainer1"></div>
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
            this.p = new p5(this.sketch, this.$refs.canvasContainer1);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(500, 500);
                p.background(255);
                
                const xWidth = p.width/4;
                const yHeight = p.height/4;

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
                                height: 40
                            },
                            {
                                x: 100,
                                y: 0,
                                width: 25,
                                height: 125
                            },
                            {
                                x: 0,
                                y: 40,
                                width: 100,
                                height: 30
                            },
                        ];

                        squares.forEach(square => {
                            p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
                            p.rect(square.x, square.y, square.width, square.height);
                        });
                         
/*                         for (let i = 0; i < 5; i++) {
                            //p.square(p.random(y, y + yHeight -20), p.random(x, x + xWidth -20), 20)
                            p.rect(p.random(y, y + yHeight), p.random(x, x + xWidth), p.random(0, 50), p.random(0, 50))
                            // rect(x,y,width,height)
                        } */  
                    }
                }
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