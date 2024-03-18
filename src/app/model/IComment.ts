import { IMember } from "./Member";

export interface IComment {
    id: number | null;
    memberId: number | null;
    content: string;
    member: IMember;
    postId: number;
}

export class CommentRequest {
    constructor(
        public memberId: number,
        public postId: number,
        public content: string,
    ) {}
}