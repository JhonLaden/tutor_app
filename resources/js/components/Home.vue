<script setup lang="ts">
import Tesseract from "tesseract.js";
import { onMounted, reactive, ref } from "vue";
import nlp from "compromise";
import nlpDates from "compromise-dates";
nlp.extend(nlpDates);
const mySentence = ref<string>("");

const outputSentence = ref<string>("");

const handleSubmit = () => {
    console.log("test");
};

onMounted(() => {
    const doc = nlp("Shakespear died in 1616.");
    const sen = doc.sentences().json()[0].terms;
    let combinedSen = "";
    for (let i = 0; i < sen.length; i++) {
        let tag = sen[i].tags;
        let word = sen[i].text;

        if (tag.includes("Noun") && !tag.includes("People")) {
            word = nlp(word).nouns().toPlural().text();
        }
        combinedSen += word;
        combinedSen += sen[i].post;
        console.log(sen[i]);
    }
    console.log(combinedSen);
});
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <p>{{ mySentence }}</p>
        <button type="submit">Submit</button>
        <p>{{ outputSentence }}</p>
    </form>
    <div></div>
</template>
