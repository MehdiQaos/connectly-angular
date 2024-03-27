import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/Member';
import { ImageService } from 'src/app/service/image.service';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() profile!: Profile;
  isOwnProfile = false;
  isFollowing = false;

  constructor(
    public imageService: ImageService,
    private memberService: MemberService,
    private storeService: StoreService,
  ) {}

  ngOnInit(): void {
    const profileId = this.profile.member.id;
    const userId = this.storeService.user.id;
    this.memberService.isFollowing(userId, profileId)
      .subscribe((isFollowing: boolean) => {
        this.isFollowing = isFollowing;
      });
    this.isOwnProfile = profileId == userId;
  }

  follow() {
    this.memberService
      .followMember(this.storeService.user.id, this.profile.member.id)
      .subscribe(() => {
        this.isFollowing = true;
        this.profile.numberOfFollowers++;
      });
  }

  unFollow() {
    this.memberService
      .unfollowMember(this.storeService.user.id, this.profile.member.id)
      .subscribe(() => {
        this.isFollowing = false;
        this.profile.numberOfFollowers--;
      });
  }
}
