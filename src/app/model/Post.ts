import { Member } from "./Member";

export class Post {
    constructor(
        public id: number = 0,
        public content: string = '',
        public imageLocation = '',
        public member: Member = new Member(),
        public likedMembers: Member[] = []
    ) {}
}