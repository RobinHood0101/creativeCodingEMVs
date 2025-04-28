<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <div class="wrapper">
            <nav class="fixed top-0 bg-blue-300 p-1">
                <ul class="flex gap-4 underline">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/patterns">Patterns</RouterLink></li>
                    <li><RouterLink to="/image-manipulation">Image Manipulation</RouterLink></li>
                    <li><RouterLink to="/agent">Agent</RouterLink></li>
                    <li><RouterLink to="/l-systems">L-Systems</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
