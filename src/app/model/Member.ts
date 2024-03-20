export class Member {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public birthDate: string = '',
        public email: string = '',
        public bio: string = '',
        public location: string = '',
        public profession: string = '',
        public profilePictureLocation: string = '',
    ) { }
}

export class Profile {
    constructor(
        public member: Member = new Member(),
        public numberOfPosts: number = 0,
        public numberOfFollowers: number = 0,
        public numberOfFollowings: number = 0,
        public numberOfComments: number = 0,
        public numberOfLikes: number = 0
    ) { }
}