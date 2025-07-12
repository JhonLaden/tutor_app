<script setup lang="ts">
import axios from "axios";
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();

const form = reactive({
    username: "",
    email: "",
    password: "",
});

const state = reactive({
    credentials: {},
});

const handleSignup = async () => {
    state.credentials = form;
    const response = await axios.post("/api/user/signup", state.credentials);
    const data = response.data;
    const user = data;
    router.push("home");
    console.log(data);
};
</script>

<template>
    <section class="flex justify-center">
        <form
            @submit.prevent="handleSignup"
            class="border rounded py-5 px-4 mt-5 w-[500px] flex flex-col"
        >
            <h1 class="font-bold text-center text-2xl">Sign up</h1>
            <div class="flex flex-col">
                <label for="username">Username</label>
                <input
                    class="px-3 py-2 border rounded mb-5"
                    type="text"
                    name="username"
                    id="username"
                    v-model="form.username"
                    required
                />
                <label for="email">Email</label>
                <input
                    class="px-3 py-2 border rounded mb-5"
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.email"
                    required
                />
                <label for="password">Password</label>
                <input
                    class="px-3 py-2 border rounded mb-5"
                    type="password"
                    name="password"
                    id="password"
                    v-model="form.password"
                    required
                />
            </div>
            <button
                class="bg-gray-900 py-3 px-5 cursor-pointer hover:bg-gray-500 text-white rounded transition-all mb-5"
                type="submit"
            >
                Register
            </button>

            <span class="flex justify-center">
                <p>Already have an account?</p>
                <RouterLink to="login">Sign in</RouterLink>
            </span>
        </form>
    </section>
</template>
