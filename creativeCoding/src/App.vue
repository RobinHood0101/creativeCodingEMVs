<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>

        <div class="wrapper">

            <nav>
                <ul class="flex gap-4">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/patterns">Patterns</RouterLink></li>
                    <li><RouterLink to="/image-manipulation">Image Manipulation</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>

    <RouterView />

</template>

<style scoped>

</style>
