import { all } from "axios";
import nlp from "compromise";
import nlpDates from "compromise-dates";

nlp.extend(nlpDates);

function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export function useQuizGenerator() {
    function extractNoun(sentence: string): string {
        const doc = nlp(sentence);
        const terms = doc.sentences().json()[0]?.terms || [];

        for (let i = 0; i < terms.length; i++) {
            const tag = terms[i].tags;
            const word = terms[i].text;

            // Look for specific types of nouns
            if (
                tag.includes("Person") ||
                tag.includes("Noun") ||
                tag.includes("Place") ||
                tag.includes("Organization")
            ) {
                return word;
            }
        }

        return ""; // fallback
    }

    function replaceToBlank(statement: string) {
        const doc = nlp(statement);
        const people = doc.people().out("array");
        const places = doc.places().out("array");
        const dates = doc.dates().out("array");
        const nouns = doc.nouns().out("array");

        // Choose target in order of priority
        const candidates = [
            ...people.map((word: string) => ({ word, type: "person" })),
            ...places.map((word: string) => ({ word, type: "place" })),
            ...dates.map((word: string) => ({ word, type: "date" })),
            ...nouns.map((word: string) => ({ word, type: "noun" })),
        ];

        // Filter out too short or invalid entries
        const filtered = candidates.filter((c) => c.word.length > 2);

        if (filtered.length === 0) {
            return {
                question: statement,
                answer: "",
            };
        }

        const selected = filtered[Math.floor(Math.random() * filtered.length)];
        const question = statement.replace(selected.word, "______");

        if (isLastIndexPeriod(selected.word)) {
            selected.word = selected.word.slice(0, -1);
        }

        return {
            question,
            answer: selected.word,
            type: selected.type,
        };
    }
    function generateChoicesByType(type: string, correct: string): string[] {
        let pool: string[] = [];

        if (type.includes("Person")) {
            // handle person choices
            pool = [
                "Marie Curie",
                "Isaac Newton",
                "Ada Lovelace",
                "Nikola Tesla",
            ];
        } else if (type.includes("Place")) {
            // handle place choices
            pool = ["Paris", "New York", "London", "Tokyo", "Berlin"];
        } else if (type.includes("Date")) {
            // handle date choices
            pool = ["in 1901,", "in 1928,", "in 2000,", "in 1945,", "in 1776,"];
        } else {
            // fallback (e.g., Noun)
            pool = [
                "electricity",
                "gravity",
                "evolution",
                "quantum theory",
                "photosynthesis",
            ];
        }

        // Remove correct answer if it exists in the pool
        const filtered = pool.filter((item) => item !== correct);

        // Select 3 random distractors and add the correct answer
        const distractors = getRandomItems(filtered, 3);
        const choices = getRandomItems([...distractors, correct], 4);

        return choices;
    }

    function generatePersonChoices(correct: string) {
        const pool = [
            "Isaac Newton",
            "Nikola Tesla",
            "Galileo Galilei",
            "Marie Curie",
            "Stephen Hawking",
            "Niels Bohr",
            "James Clerk Maxwell",
            "Ada Lovelace",
            "Charles Darwin",
        ];

        const filtered = pool.filter((name) => name !== correct);
        const distractors = getRandomItems(filtered, 3);

        const all = [...distractors, correct];

        // remove accidental duplicates
        const unique = Array.from(new Set(all));

        // fill again if it drops below 4 due to duplicates
        while (unique.length < 4) {
            const extra = getRandomItems(filtered, 1)[0];
            if (!unique.includes(extra)) unique.push(extra);
        }

        return getRandomItems(unique, 4);
    }

    function generateChoices(statement: string, correctAnswer: string) {
        const doc = nlp(statement);

        // Get similar types of words (for now: nouns or people)
        const people = doc.terms().out("array");
        const sentenceAnswer = nlp(correctAnswer);
        const tagOfAnswer = sentenceAnswer.terms().json()[0].terms[0].tags;

        // Combine possible options
        const candidates = generateChoicesByType(tagOfAnswer, correctAnswer);
        // Add correct answer
        const allChoices = getRandomItems(candidates, 4);

        // Shuffle final list
        return getRandomItems(allChoices, 4);
    }

    function generateMultipleChoice(statement: string) {
        const { question, answer } = replaceToBlank(statement);
        const choices = generateChoices(statement, answer);

        return {
            question,
            answer,
            choices,
        };
    }

    function isLastIndexPeriod(word: string) {
        const lastIndex = word.length - 1;
        if (word[lastIndex] == ".") {
            return true;
        }
        return false;
    }
    function removePeriod(word: string) {
        const lastIndex = word.length - 1;
        if (word[lastIndex] == ".") {
            word = word.slice(0, -1);
        }
        return false;
    }
    return {
        replaceToBlank,
        generateMultipleChoice,
    };
}
