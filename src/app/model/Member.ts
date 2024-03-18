export class Member {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public profilePictureLocation: string = '',
        public coverPictureLocation: string = ''
    ) { }
}