export interface CardEntry {
    name: string;
    foreground_image: string;
    background_gradient: string[];
    count: number;
}

export interface QuestionnaireEntry {
    question: string;
    entries: CardEntry[];
}