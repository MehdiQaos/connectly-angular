import { Member } from "./Member";

export class CommentRequest {
    constructor(
        public memberId: number = 1,
        public postId: number = 1,
        public content: string = '',
    ) {}
}

export class CommentResponse {
    constructor(
        public id: number = 0,
        public content: string = '',
        public member: Member = new Member(),
    ) {}
}