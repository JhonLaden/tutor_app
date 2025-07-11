<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <section class="flex justify-center">
        <form class="border rounded py-5 px-4 mt-5 w-[500px] flex flex-col">
            <h1 class="font-bold text-center text-2xl">Sign in</h1>
            <div class="flex flex-col">
                <label for="username">Username</label>
                <input
                    class="px-3 py-2 border rounded mb-5"
                    type="text"
                    name="username"
                    id="username"
                    required
                />
                <label for="password">Password</label>
                <input
                    class="px-3 py-2 border rounded mb-5"
                    type="password"
                    name="password"
                    id="password"
                    required
                />
            </div>
            <button
                class="bg-gray-900 py-3 px-5 cursor-pointer hover:bg-gray-500 text-white rounded transition-all mb-5"
                type="submit"
            >
                Sign In
            </button>

            <span class="flex justify-center">
                <p>Already have an account?</p>
                <RouterLink to="signup">Sign up</RouterLink>
            </span>
        </form>
    </section>
</template>
