<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const message = ref("");
const result = ref<{}>({});

const handleSubmit = () => {
    fetchData();
};

const fetchData = async () => {
    try {
        const response = await axios.post("/api/analyze", {
            message: message.value,
        });
        const data = response.data;
        result.value = data;
        console.log(result.value);
    } catch (error) {
        console.error("error: ", error);
    }
};

// onMounted(fetchData);
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input
            type="text"
            name="sentence"
            id="sentence"
            placeholder="Enter sentence"
            v-model="message"
        />
        <button type="submit">Submit</button>
    </form>
    <ul v-if="result">
        <li v-for="item in result">
            <p>Who {{ item.verb }}?</p>
            <p>what {{ item.subject }} did?</p>
        </li>
    </ul>
</template>
