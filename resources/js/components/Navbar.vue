<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <nav
        class="bg-green-700 text-white px-6 py-4 flex justify-between items-center"
    >
        <h1 class="text-xl font-bold">TutorApp</h1>
        <ul>
            <li class="space-x-4">
                <RouterLink class="" to="/">Home</RouterLink>
                <RouterLink class="" to="/about">About</RouterLink>
                <RouterLink class="" to="/contact">Contact</RouterLink>
                <RouterLink class="" to="/login">Sign In</RouterLink>
            </li>
        </ul>
    </nav>
</template>
