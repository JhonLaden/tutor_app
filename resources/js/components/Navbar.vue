<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";
import axios from "axios";

const userStore = useUserStore();

const handleLogout = async () => {
    const response = await axios.post("/api/user/logout", userStore.user);
    const data = response.data;
    userStore.user = null;
    console.log(data);
};

const isLoggedUser = computed(() => userStore.user);
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
                <RouterLink v-if="!isLoggedUser" class="" to="/login"
                    >Sign In</RouterLink
                >
                <button
                    v-if="isLoggedUser"
                    @click="handleLogout"
                    class="cursor-pointer"
                >
                    Sign out
                </button>
            </li>
        </ul>
    </nav>
</template>
