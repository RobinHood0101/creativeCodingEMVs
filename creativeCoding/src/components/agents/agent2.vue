<template>
    <div ref="agent2"></div>
</template>
<script>
import p5 from "p5";

export default {
    name: "agent2",
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
            this.p = new p5(this.sketch, this.$refs.agent2);
        },
        sketch(p) {
            p.preload = () => {};
            p.setup = () => {
                p.createCanvas(400, 400);
            };
            p.draw = () => {
                p.background(200);
                for (let i = 0; i < p.width; i += 4) {
                    p.noFill();
                    p.square(0, 0, i);
                }
                p.fill(200);
                p.circle(p.width / 2, p.height / 2, 30);
            };
        },
    },
};
</script>

<style scoped></style>
