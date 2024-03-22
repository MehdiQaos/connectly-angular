import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/model/Member';
import { Post } from 'src/app/model/Post';
import { ImageService } from 'src/app/service/image.service';
import { MemberService } from 'src/app/service/member.service';
import { PostService } from 'src/app/service/post.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: Profile = new Profile();
  profileId = 1;
  age = '';
  posts: Post[] = [];
  isOwnProfile = false;
  isFollowing = false;
  profilePictureUrl: string | null = null;
  paramsSubscription!: Subscription;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private postService: PostService,
    private storeService: StoreService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.profileId = params['id'];
      this.loadProfile(this.profileId);
      this.postService
        .getMemberPosts(this.profileId)
        .subscribe((posts: Post[]) => {
          this.posts = posts;
        });
      this.isOwnProfile = this.profileId == this.storeService.user.id;
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  loadProfile(id: number) {
    this.memberService.getProfile(id).subscribe((profile: Profile) => {
      this.profile = profile;
      this.profilePictureUrl = this.imageService.getImageUrl(profile.member.profilePictureLocation);
      this.age = this.getAge(this.profile.member.birthDate).toString();
      this.memberService
        .isFollowing(this.storeService.user.id, this.profileId)
        .subscribe((isFollowing: boolean) => {
          this.isFollowing = isFollowing;
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
        this.loadProfile(this.profileId);
      });
  }

  unFollow() {
    this.memberService
      .unfollowMember(this.storeService.user.id, this.profileId)
      .subscribe(() => {
        this.isFollowing = false;
        this.loadProfile(this.profileId);
      });
  }

  toggleFollow() {
    if (this.isFollowing) {
      this.memberService
        .unfollowMember(this.storeService.user.id, this.profileId)
        .subscribe(() => {
          this.isFollowing = false;
        });
    } else {
      this.memberService
        .followMember(this.storeService.user.id, this.profileId)
        .subscribe(() => {
          this.isFollowing = true;
        });
    }
    this.loadProfile(this.profileId);
  }

  goToEditProfile() {
    this.router.navigate(['/profile/edit']);
  }
}
