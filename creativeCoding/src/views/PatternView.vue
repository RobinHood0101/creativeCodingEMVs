<script>
import P5Canvas1 from '../components/P5Canvas1.vue'
import P5Canvas2 from '../components/P5Canvas2.vue'
import P5Canvas3 from '../components/P5Canvas3.vue'
import P5Canvas4 from '../components/P5Canvas4.vue'

export default {
    components: {
        P5Canvas1,
        P5Canvas2,
        P5Canvas3,
        P5Canvas4,
    },
    data() {
        return {
            
        }
    }
}
</script>

<template>
    <main>
        <h1>Patterns</h1>

        <h2>Pattern 1</h2>
        <P5Canvas1 />

        <h2>Pattern 2</h2>
        <P5Canvas2 />

        <h2>Pattern 3</h2>
        <P5Canvas3 />

        <h2>Pattern 4</h2>
        <P5Canvas4 />
    </main>
</template>
