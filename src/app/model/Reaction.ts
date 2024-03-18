import { Member } from "./Member";

export interface IReaction {
    id: number | null;
    reactionType: string;
    member: Member;
}

export class Reaction {
    constructor(
        public id: number = 0,
        public reactionType: string = 'LIKE',
        public member: Member = new Member(),
    ) {}
}