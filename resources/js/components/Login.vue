<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
    username: "",
    password: "",
});

const state = reactive({
    credentials: {},
});

const handleSignin = async () => {
    state.credentials = form;
    const response = await axios.post("/api/user/login", state.credentials);
    const user = response.data.user;
    if (user && response.status == 200) {
        userStore.user = user;
        console.log(userStore.user);
        router.push("/");
    } else {
        console.log(response.data);
    }   
};
</script>

<template>
    <section class="flex justify-center">
        <form
            @submit.prevent="handleSignin"
            class="border rounded py-5 px-4 mt-5 w-[500px] flex flex-col"
        >
            <h1 class="font-bold text-center text-2xl">Sign in</h1>
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
                Sign In
            </button>

            <span class="flex justify-center">
                <p>Already have an account?</p>
                <RouterLink to="signup">Sign up</RouterLink>
            </span>
        </form>
    </section>
</template>
