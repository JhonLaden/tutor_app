import nlp from "compromise";
import nlpDates from "compromise-dates";

// Register plugin
nlp.extend(nlpDates);

export function useCompromiseHandler() {
    function validate(input: string): string[] {
        const doc = nlp(input);
        let sentences: string[] = [];
        let sentence: string = "";
        const normalizedInput = doc.normalize().text();

        console.log("Original:", input);
        console.log("Normalized:", normalizedInput);
        console.log("Dates:", doc.dates().out("array"));

        sentences = nlp(normalizedInput).sentences().out("array");
        console.log(sentences);
        return sentences;
    }

    return {
        validate,
    };
}
