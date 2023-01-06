import verbs from '../data/data.json'
import { Quiz, Verb } from '../types'

export default function useQuestion() {

    const getRandomItemFromJson = (json: Verb[]) => {
        const keys = Object.keys(json)
        const randomKey = keys[(keys.length * Math.random()) << 0]
        return json[randomKey as keyof typeof json]
    }

    const getFourRamdomResponsesFromJsonExcludingQuestion = (
        json: Verb[],
        question: Verb
    ):Verb[] => {
        const keys = Object.keys(json)
        const randomKeys = keys

        // Remove the question from the list of possible answers
        const index = randomKeys.indexOf((question.id).toString())
        if (index > -1) {
            randomKeys.splice(index, 1)
        }

        // Get four random keys
        const randomKeysToUse = randomKeys
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)

        // Get the verbs from the keys
        const randomVerbs = randomKeysToUse.map((key) => json[key as keyof typeof json])

        return randomVerbs as Verb[]
    }

    const getQuiz = ():Quiz => {
        const question = getRandomItemFromJson(verbs)
        const responses = getFourRamdomResponsesFromJsonExcludingQuestion(
            verbs,
            question as Verb
        )

        // Add the question to the list of possible answers
        responses.push(question as Verb)

        // Shuffle the list of possible answers
        const shuffledResponses = responses.sort(() => 0.5 - Math.random())

        return {
            question: question as Verb,
            responses: shuffledResponses.map((verb) => verb.description),
        }
    }

  return {
    verbs,
    getQuiz,
  }
}
