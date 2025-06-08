<script>
import Image1 from "../components/imageManipulations/Image1.vue";
import Image2 from "../components/imageManipulations/Image2.vue";
import Image3 from "../components/imageManipulations/Image3.vue";
import Image4 from "../components/imageManipulations/Image4.vue";
import Image5 from "../components/imageManipulations/Image5.vue";

export default {
    components: {
        Image1,
        Image2,
        Image3,
        Image4,
        Image5,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<template>
    <h1>Image Manipulation</h1>
    <main>
        <section>
            <h2>Moving image</h2>
            <Image1 />
        </section>

        <section>
            <h2>Sort image pixels by...</h2>
            <Image2 />
        </section>

        <section>
            <h2>Combined images</h2>
            <Image3 />
        </section>

        <section>
            <h2>Image glitch effect</h2>
            <Image4 />
        </section>

        <section>
            <h2>Random dithering effect</h2>
            <Image5 />
        </section>
    </main>
</template>
