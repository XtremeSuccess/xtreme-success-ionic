export class Chapter {
    id: number;
    name: string;
    short_desc: string;
    chapter_details: ChapterDetails;
    created_at: string;
    updated_at: string;
}

export class ChapterDetails {
    id: number;
    text: string;
    created_at: string;
    updated_at: string;
}
