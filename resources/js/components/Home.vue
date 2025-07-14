<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useQuizGenerator } from "@/composables/useQuizGenerator";
import { useQuizStore } from "@/stores/useQuizStore";
import { useCompromiseHandler } from "@/composables/useCompromiseHandler";

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

onMounted(() => {
    const validatedInput =
        validate(`The Industrial Revolution began in the late 18th century and marked a major turning point in human history. It originated in Great Britain and rapidly spread to other parts of the world. During this period, societies shifted from agrarian economies to industrialized ones, driven by innovations such as the steam engine, mechanized textile production, and improved transportation. This transformation not only changed how goods were produced but also had profound effects on urbanization, labor, and social structures, laying the foundation for the modern world.

`);
    for (let i = 0; i < validatedInput.length; i++) {
        const result = generateMultipleChoice(validatedInput[i]);
        quizStore.addQuestion(result);
    }
});
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
