<script>
import Agent1 from "../components/agents/Agent1.vue";
import Agent2 from "../components/agents/Agent2.vue";
import Agent3 from "../components/agents/Agent3.vue";
import p5 from "p5";
export default {
    components: {
        Agent1,
        Agent2,
        Agent3,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<template>
    <h1>Agent</h1>
    <main>
        <section>
            <h1>Shape looking like a "pipe"</h1>
            <Agent1 />
        </section>

        <section>
            <h1>Individual agent</h1>
            <Agent2 />
        </section>

        <section>
            <h1>Abstract algorithm (Circles)</h1>
            <Agent3 />
        </section>
    </main>
</template>

<style scoped></style>
