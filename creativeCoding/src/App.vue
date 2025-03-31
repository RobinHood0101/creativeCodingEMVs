<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>

        <div class="wrapper">

            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/canvas1">Canvas1</RouterLink>
                <RouterLink to="/canvas2">Canvas2</RouterLink>
                <RouterLink to="/canvas3">Canvas3</RouterLink>
                <RouterLink to="/canvas4">Canvas4</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />

</template>

<style scoped>

</style>
