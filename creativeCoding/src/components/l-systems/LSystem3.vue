<script>
import p5 from "p5";

let axiom = "F";
let sentence = axiom;
let len = 100;
let btnCount = 0;

const rules = [];
rules[0] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]",
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
            p.translate(p.width / 2, p.height / 2);
            p.stroke(255, 100);
            for (let i = 0; i < sentence.length; i++) {
                let current = sentence.charAt(i);

                if (current == "F") {
                    p.line(0, 0, 0, -len);

                    p.translate(0, -len);
                } else if (current == "+") {
                    p.rotate(p.PI / 5);
                } else if (current == "-") {
                    p.rotate(-p.PI / 6);
                } else if (current == "[") {
                    p.push();
                } else if (current == "]") {
                    p.pop();
                }
            }
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(400, 400);
                p.background(51);
                p.createP("axiom: " + axiom);
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
