import { Member } from "./Member";

export class SimplePost {
    constructor(
        public id: number = 0,
        public content: string = '',
        public imageLocation: string = '',
        public member: Member = new Member(),
        public numberOfLikes: number = 0,
        public numberOfComments: number = 0,
    ) {}
}