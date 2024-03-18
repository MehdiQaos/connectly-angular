import { IMember, Member } from "./Member";

export interface IPost {
    id: number;
    content: string;
    imageLocation: string | null;
    member: IMember
    likedMembers: IMember[];
}

export class Post implements IPost {
    constructor(
        public id: number = 0,
        public content: string = '',
        public imageLocation = '',
        public member: IMember = new Member(),
        public likedMembers: IMember[] = []
    ) {}
}