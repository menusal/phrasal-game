export type Verb = {
    id: number,
    name: string,
    description: string,
}

export type Quiz = {
    question: Verb,
    responses: string[],
}

export type ScoreHistory = {
    score: number,
    date: string,
}