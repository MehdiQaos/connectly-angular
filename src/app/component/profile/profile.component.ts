import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/model/Member';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = new Profile();
  profileId = 1;
  age = '';

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.profileId = this.route.snapshot.params['id'];
    this.loadProfile(this.profileId);
  }

  loadProfile(id: number) {
    this.memberService.getProfile(id).subscribe((profile: Profile) => {
      this.profile = profile;
      this.age = this.getAge(this.profile.member.birthDate).toString();
    });
  }

  getAge(birthDate: string) {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  }
}
