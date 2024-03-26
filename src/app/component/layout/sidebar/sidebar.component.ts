import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/service/events.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // notificationsCount = 0;

  constructor(
    public store: StoreService,
    public eventservice: EventsService,
  ) {}

  // ngOnInit(): void {
  //   this.eventservice.getMemberEvents(this.store.user.id).subscribe(events => {
  //     this.notificationsCount = events.length;
  //   });
  // }
}
