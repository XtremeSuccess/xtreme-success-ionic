import { Class } from '../classes/class';
import { Stream } from '../streams/stream';
import { Subject } from '../subjects/subject';

export class Course {
    name: string;
    class: Class;
    created_at: string;
    description: string;
    duration: number;
    id: number;
    price: number;
    stream: Stream;
    subjects: Subject[];
    updated_at: string;
}