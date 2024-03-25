import { Component, Input } from '@angular/core';
import { Member } from 'src/app/model/Member';
import { ImageService } from 'src/app/service/image.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() member!: Member;

  constructor(
    public imageService: ImageService,
  ) {}
}
