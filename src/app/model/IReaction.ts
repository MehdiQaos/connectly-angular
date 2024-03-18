import { IMember } from "./Member";

export interface IReaction {
    id: number | null;
    reactionType: string;
    member: IMember;
}