import { Member } from "./Member";

export class Event {
    constructor(
        public id: number = 0,
        public eventType: 'LIKE' | 'COMMENT' | 'FOLLOW',
        public postId: number | null = null,
        public comment: Comment | null = null,
        public initiatingMember: Member = new Member(),
        public affectedMember: Member = new Member(),
        public time: string,
    ) {}
}