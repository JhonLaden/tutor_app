import { defineStore } from "pinia";
import type { QuizItem } from "@/types/QuizItem";

export const useQuizStore = defineStore("quiz", {
    state: () => ({
        questions: [] as QuizItem[],
        currentIndex: 0,
        score: 0,
        selectedAnswers: [] as string[],
    }),
    actions: {
        addQuestion(q: QuizItem) {
            q.id = this.currentIndex;
            this.questions.push(q);
        },
        selectAnswer(answer: string) {
            this.selectedAnswers[this.currentIndex] = answer;
            if (answer === this.questions[this.currentIndex].answer) {
                this.score++;
            }
            this.currentIndex++;
        },
    },
});
