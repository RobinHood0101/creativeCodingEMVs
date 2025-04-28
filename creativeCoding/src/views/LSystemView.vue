<script>
import LSystem1 from "../components/l-systems/LSystem1.vue";
import LSystem2 from "../components/l-systems/LSystem2.vue";
import LSystem3 from "../components/l-systems/LSystem3.vue";

export default {
    components: {
        LSystem1,
        LSystem2,
        LSystem3,
    },
    data() {
        return {
            selectedSystem: 3,
        };
    },
};
</script>

<template>
    <main>
        <h1>L-Systems</h1>
        <label for="systemSelect"></label>
        <select name="systemSelect" id="systemSelect" v-model="selectedSystem">
            <option value="1">System 1</option>
            <option value="2">System 2</option>
            <option value="3">System 3</option>
        </select>
        <LSystem1 v-if="selectedSystem == 1"></LSystem1>
        <LSystem2 v-if="selectedSystem == 2"></LSystem2>
        <LSystem3 v-if="selectedSystem == 3"></LSystem3>
    </main>
</template>
