import { Member } from "./Member";
import { SimplePost } from "./SimplePost";

export class Report {
    constructor(
        public id: number = 0,
        public reportedPost: SimplePost = new SimplePost(),
        public reportingMember: Member = new Member(),
        public reportReason: string = '',
        public processed: boolean = false,
    ) {}
}