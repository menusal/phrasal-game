import { useTranslation } from "react-i18next";
import esVerbs from "../data/data.json";
import enVerbs from "../data/data-en.json";
import { Quiz, Verb } from "../types";
import { useEffect, useState } from "react";

export default function useQuestion() {
  const { i18n } = useTranslation();
  const [verbs, setVerbs] = useState<Verb[]>([]);
  

  useEffect(() => {
    console.log("i18n.language", i18n);
    setVerbs((i18n.language === "es" ? esVerbs : enVerbs) as Verb[]);

    return () => {
      setVerbs([]);
    };
  }, [i18n.language]);

  const getRandomItemFromJson = (json: Verb[]) => {
    const keys = Object.keys(json);
    const randomKey = keys[(keys.length * Math.random()) << 0];
    return json[randomKey as keyof typeof json];
  };

  const getFourRamdomResponsesFromJsonExcludingQuestion = (
    json: Verb[],
    question: Verb
  ): Verb[] => {
    const keys = Object.keys(json);
    const randomKeys = keys;

    // Remove the question from the list of possible answers
    const index = randomKeys.indexOf(question.id.toString());
    if (index > -1) {
      randomKeys.splice(index, 1);
    }

    // Get four random keys
    const randomKeysToUse = randomKeys
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Get the verbs from the keys
    const randomVerbs = randomKeysToUse.map(
      (key) => json[key as keyof typeof json]
    );

    return randomVerbs as Verb[];
  };

  const getQuiz = (): Quiz => {
    const question = getRandomItemFromJson(verbs);
    const responses = getFourRamdomResponsesFromJsonExcludingQuestion(
      verbs,
      question as Verb
    );

    // Add the question to the list of possible answers
    responses.push(question as Verb);

    // Shuffle the list of possible answers
    const shuffledResponses = responses.sort(() => 0.5 - Math.random());

    return {
      question: question as Verb,
      responses: shuffledResponses.map((verb) => verb.description),
    };
  };

  return {
    verbs,
    getQuiz,
  };
}
