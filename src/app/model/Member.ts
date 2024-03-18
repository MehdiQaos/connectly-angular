export interface IMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profilePictureLocation: string | null;
    coverPictureLocation: string | null;
}

export class Member implements IMember {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public profilePictureLocation: string = '',
        public coverPictureLocation: string = ''
    ) { }
}