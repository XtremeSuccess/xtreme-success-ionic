import { Chapter } from '../chapters/chapter';
import { Stream } from '../streams/stream';

export class Subject {
    id: number;
    name: string;
    streams: Stream;
    chapters: Chapter[];
    created_at: string;
    updated_at: string;
}