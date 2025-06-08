<template>
    <div ref="agent1"></div>
</template>
<script>
import p5 from "p5";

export default {
    name: "agent1",
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
            this.p = new p5(this.sketch, this.$refs.agent1);
        },
        sketch(p) {
            let circles = [];
            p.preload = () => {};
            p.setup = () => {
                p.createCanvas(500, 500);
                // Draw starting point
                const randomX = p.random(0, p.width);
                const randomY = p.random(0, p.height);
                const randomRadius = p.random(0, 150);
                circles.push([randomX, randomY, randomRadius]);
                p.circle(randomX, randomY, randomRadius);
            };
            p.draw = () => {
                const randomX = p.random(0, p.width);
                const randomY = p.random(0, p.height);
                const randomRadius = p.random(0, 150);
                circles.forEach((circle) => {
                    if (
                        Math.sqrt(
                            (randomX - circle[0]) * (randomX - circle[0]) +
                                (randomY - circle[1]) * (randomY - circle[1])
                        ) >=
                        randomRadius + circle[2]
                    ) {
                        //circles.push([randomX, randomY, randomRadius]);
                        p.circle(randomX, randomY, randomRadius);
                    }
                });
            };
        },
    },
};
</script>

<style scoped></style>
