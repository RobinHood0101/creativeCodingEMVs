<script>
import P5Canvas1 from "../components/patterns/P5Canvas1.vue";
import P5Canvas2 from "../components/patterns/P5Canvas2.vue";
import P5Canvas3 from "../components/patterns/P5Canvas3.vue";
import P5Canvas4 from "../components/patterns/P5Canvas4.vue";
import P5Canvas5 from "../components/patterns/P5Canvas5.vue";

export default {
    components: {
        P5Canvas1,
        P5Canvas2,
        P5Canvas3,
        P5Canvas4,
        P5Canvas5,
    },
    data() {
        return {};
    },
};
</script>

<template>
    <h1>Patterns</h1>
    <main class="flex flex-col gap-50">
        <section class="border">
            <h2>Pattern 1</h2>
            <P5Canvas1 />
        </section>

        <section class="border">
            <h2>Pattern 2</h2>
            <P5Canvas2 />
        </section>

        <section class="border">
            <h2>Pattern 3</h2>
            <P5Canvas3 />
        </section>

        <section class="border">
            <h2>Pattern 4</h2>
            <P5Canvas4 />
        </section>

        <section class="border">
            <h2>Pattern 5</h2>
            <P5Canvas5 />
        </section>
    </main>
</template>
