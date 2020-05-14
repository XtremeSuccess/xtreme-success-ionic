import { Course } from '../courses/course';

export class Subscription {
    id: number;
    start_date: string;
    end_date: string;
    course: Course;
    created_at: string;
    updated_at: string;
}