<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const message = ref("Elon Musk founded SpaceX in 2002 with $100 million.");
const myObject = ref<{}>({});

const handleSubmit = () => {
    console.log("clicked");
};

const fetchData = async () => {
    try {
        const response = await axios.post("/api/analyze", {
            message: message.value,
        });
        const data = response.data;
        myObject.value = data;
    } catch (error) {
        console.error("error: ", error);
    }
};

onMounted(fetchData);
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            name="sentence"
            id="sentence"
            placeholder="Enter sentence"
        />
        <button type="submit">Submit</button>
    </form>
    <ul v-if="myObject">
        <li v-for="item in myObject">{{ item }}</li>
    </ul>
</template>
