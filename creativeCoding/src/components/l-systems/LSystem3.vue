<script>
import p5 from "p5";

let axiom = "Y";
let sentence = axiom;
let len = 20;
let btnCount = 0;
let angle = 25.7;
let rad = (angle * Math.PI) / 180;

const rules = [];
rules[0] = {
    a: "X",
    b: "X[-FFF][+FFF]FX",
};
rules[1] = {
    a: "Y",
    b: "YFX[+Y][-Y]",
};

export default {
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
    beforeRouteLeave(to, from, next) {
        // Reset the canvas
        if (this.p) {
            this.p.remove(); // Remove the current p5 instance
        }
        next(); // Proceed to the next route
    },
    methods: {
        createCanvas() {
            this.p = new p5(this.sketch, this.$refs.canvasContainer3);
        },
        generate(p) {
            if (btnCount > 4) {
                return;
            }
            len *= p.random(0.5, 1);
            let nextSentence = "";
            for (let i = 0; i < sentence.length; i++) {
                let current = sentence.charAt(i);
                let found = false;
                for (let j = 0; j < rules.length; j++) {
                    if (current == rules[j].a) {
                        found = true;
                        nextSentence += rules[j].b;
                        break;
                    }
                }
                if (!found) {
                    nextSentence += current;
                }
            }
            sentence = nextSentence;
            p.createP(sentence);
            this.turtle(p);
        },
        turtle(p) {
            p.background(51);
            p.resetMatrix();
            p.translate(p.width / 2, p.height);
            p.stroke(255, 204, 0);
            for (let i = 0; i < sentence.length; i++) {
                let current = sentence.charAt(i);

                if (current == "F") {
                    p.line(0, 0, 0, -len);

                    p.translate(0, -len);
                } else if (current == "+") {
                    p.rotate(rad);
                } else if (current == "-") {
                    p.rotate(-rad);
                } else if (current == "[") {
                    p.push();
                } else if (current == "]") {
                    p.pop();
                } else if (current == "f") {
                    p.translate(0, -len);
                }
            }
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(400, 400);
                p.background(51);
                // Show details
                p.createP("axiom: " + axiom);
                p.createP("Rules:");
                for (let i = 0; i < rules.length; i++) {
                    p.createP(rules[i].a + " -> " + rules[i].b);
                }
                this.turtle(p);
                let button = p.createButton("generate");
                button.mousePressed(() => this.generate(p));
            };
            p.draw = () => {};
        },
    },
};
</script>

<template>
    <h2>L-System 3</h2>
    <div ref="canvasContainer3"></div>
</template>
