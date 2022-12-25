export type Verb = {
    id: number,
    name: string,
    description: string,
}

export type Quiz = {
    question: Verb,
    responses: string[],
}