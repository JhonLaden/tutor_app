<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useQuizGenerator } from "@/composables/useQuizGenerator";
import { useQuizStore } from "@/stores/useQuizStore";
import { useCompromiseHandler } from "@/composables/useCompromiseHandler";
import axios from "axios";

const sentence = ref<string>("");
const { validate } = useCompromiseHandler();
const { replaceToBlank, generateMultipleChoice } = useQuizGenerator();
const quizStore = useQuizStore();


const outputSentence = ref<{
    question: string;
    answer: string;
    choices: string[];
}>({
    question: "",
    answer: "",
    choices: [],
});

const handleSubmit = () => {
    if (sentence) {
        const item = generateMultipleChoice(sentence.value);
        quizStore.addQuestion(item);
        sentence.value = "";
    } else {
        console.log("empty");
    }
};

const fetchData = async () => {
    try {
        const response = await axios.get("/api/analyze");
        const data = response.data;
        console.log(data);
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
            v-model="sentence"
        />
        <button type="submit">Submit</button>
    </form>
    <ul>
        <li v-for="(item, index) in quizStore.questions" class="mb-5">
            <h1 class="mb-2">{{ index + 1 }} : {{ item.question }}</h1>
            <span>
                <div v-for="(choice, index2) in item.choices" :key="index2">
                    <p>{{ String.fromCharCode(65 + index2) }}. {{ choice }}</p>
                </div>
            </span>
        </li>
    </ul>
</template>
