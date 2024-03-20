import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/Member';
import { Post } from 'src/app/model/Post';
import { MemberService } from 'src/app/service/member.service';
import { PostService } from 'src/app/service/post.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = new Profile();
  profileId = 1;
  age = '';
  posts: Post[] = [];
  isOwnProfile = false;
  isFollowing = false;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private postService: PostService,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.profileId = this.route.snapshot.params['id'];
    this.loadProfile(this.profileId);
    this.postService
      .getMemberPosts(this.profileId)
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    this.isOwnProfile = this.profileId == this.storeService.user.id;
  }

  loadProfile(id: number) {
    this.memberService.getProfile(id).subscribe((profile: Profile) => {
      this.profile = profile;
      this.age = this.getAge(this.profile.member.birthDate).toString();
      this.memberService
        .isFollowing(this.storeService.user.id, this.profileId)
        .subscribe((isFollowing: boolean) => {
          this.isFollowing = isFollowing;
          console.log('isFollowing: ' + isFollowing);
        });
    });
  }

  getAge(birthDate: string) {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  }

  follow() {
    this.memberService
      .followMember(this.storeService.user.id, this.profileId)
      .subscribe(() => {
        this.isFollowing = true;
        console.log('followed');
        console.log('loading profile again');
        this.loadProfile(this.profileId);
      });
  }

  unFollow() {
    this.memberService
      .unfollowMember(this.storeService.user.id, this.profileId)
      .subscribe(() => {
        this.isFollowing = false;
        console.log('unfollowed');
        console.log('loading profile again');
        this.loadProfile(this.profileId);
      });
  }

  toggleFollow() {
    if (this.isFollowing) {
      this.memberService
        .unfollowMember(this.storeService.user.id, this.profileId)
        .subscribe(() => {
          this.isFollowing = false;
          console.log('unfollowed');
        });
    } else {
      this.memberService
        .followMember(this.storeService.user.id, this.profileId)
        .subscribe(() => {
          this.isFollowing = true;
          console.log('followed');
        });
    }
    console.log('loading profile again');
    this.loadProfile(this.profileId);
  }
}
