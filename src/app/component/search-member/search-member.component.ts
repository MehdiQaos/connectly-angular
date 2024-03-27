import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member, Profile } from 'src/app/model/Member';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.css'],
})
export class SearchMemberComponent implements OnInit {
  query = '';
  members: Profile[] = [];

  constructor(
    private memberService: MemberService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    console.log(this.query);
    
    this.memberService.searchMembers(this.query).subscribe({
      next: (members) => {
        this.members = members;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSearch(): void {
    this.loadMembers();
  }
}
