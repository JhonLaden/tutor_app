<script setup lang="ts">
import Tesseract from "tesseract.js";
import { onMounted, reactive, ref } from "vue";

const form = reactive({
    img: null as File | null,
});

const mytext = ref("");
const questions = ref<string[][]>([]);

const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.[0]) {
        form.img = target.files[0];
    }
};

const handleSubmit = () => {
    if (!form.img) return;
    questions.value = [];

    Tesseract.recognize(form.img, "eng", {
        logger: (m) => {
            if (m.status === "recognizing text") {
                console.log(`Progress: ${Math.round(m.progress * 100)}%`);
            }
        },
    }).then(({ data: { text } }) => {
        mytext.value = text;
        askQuestion();
    });
};

const askQuestion = () => {
    const sentence = mytext.value;
    const isIndex = sentence.indexOf(" is");
    const indexes = [];
    let i: number = 0;

    while ((i = sentence.indexOf(" is", i)) !== -1) {
        indexes.push(i);
        i++;
    }
    console.log(indexes);

    for (let i = 0; i < indexes.length; i++) {
        const beforeIs = sentence.slice(0, indexes[i]).trim();
        const words = beforeIs.split(" ");
        const wordBeforeIs = words[words.length - 1];

        // Start after " is"
        const afterIs = sentence.slice(indexes[i] + 4); // +4 = length of " is"
        const endDot = afterIs.indexOf(".");
        const answer =
            endDot !== -1 ? afterIs.slice(0, endDot).trim() : afterIs.trim();

        questions.value.push(["What is " + wordBeforeIs + "?", answer]);
    }
    // if (isIndex !== -1) {
    //     const beforeIs = sentence.slice(0, isIndex).trim();
    //     const words = beforeIs.split(" ");
    //     const wordBeforeIs = words[words.length - 1];
    //     console.log("what is " + wordBeforeIs + "?");
    // }
};
onMounted(() => {
    questions.value = [];
});
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="file" @change="handleChange" />
        <button type="submit">Submit</button>
    </form>
    <div>
        <p v-for="question in questions">{{ question }}</p>
    </div>
</template>
