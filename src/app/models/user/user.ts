import { Course } from './../courses/course';
import { Class } from '../classes/class';

export class ImageFormat {
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
}

export class Formats {
    thumbnail?: ImageFormat;
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
}

export class Img {
    id: number
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: Formats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: any;
    created_at: string;
    updated_at: string;
}

export class Role {
    description: string;
    id: number;
    name: string;
    type: string;
}

export class UserDetail {
    address: string;
    created_at: string;
    updated_at: string;
    firstname: string;
    lastname: string;
    img: Img;
    id: number;
    mobile_number: string;
    parent_mobile_number: string;
    parent_name: string;
    school_name: string;
    subscription: any;
}

export class User {
    blocked: boolean;
    confirmed: boolean;
    created_at: string;
    email: string;
    id: number;
    provider: string;
    role: Role;
    updated_at: string;
    username: string;
    user_detail: UserDetail;
}