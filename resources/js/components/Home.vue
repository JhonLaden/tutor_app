<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const message = ref("");
const result = ref<{}>({});

const handleSubmit = () => {
    message.value = "Einstein developed the theory of relativity.";
    fetchData();
};

const fetchData = async () => {
    try {
        const response = await axios.post("/api/analyze", {
            message: message.value,
        });
        const data = response.data;
        result.value = data.item;
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
        <li v-for="item in result" :key="item.noun">
            <p>Noun: {{ item.noun }}</p>
            <p>Verb: {{ item.verb }}</p>
            <p>Object: {{ item.object }}</p>
            <p>question: {{ item.question }}</p>
            <p>answer: {{ item.answer }}</p>
        </li>
    </ul>
</template>
