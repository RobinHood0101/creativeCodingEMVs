<script>
import p5 from "p5";

let axiom = "A";
let sentence = axiom;
const rules = [];
rules[0] = {
    a: "A",
    b: "AB",
};
rules[1] = {
    a: "B",
    b: "A",
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
            this.p = new p5(this.sketch, this.$refs.canvasContainer2);
        },
        generate(p) {
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
        },
        sketch(p) {
            p.setup = () => {
                p.noCanvas();
                p.createP("axiom: " + axiom);
                let button = p.createButton("generate");
                button.mousePressed(() => this.generate(p));
            };
            p.draw = () => {};
        },
    },
};
</script>

<template>
    <h2>L-System 2</h2>
    <div ref="canvasContainer2"></div>
</template>
