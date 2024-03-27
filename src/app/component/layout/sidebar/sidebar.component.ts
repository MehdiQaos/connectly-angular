import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { EventsService } from 'src/app/service/events.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    public store: StoreService,
    public eventservice: EventsService,
    public auth: AuthService,
  ) {}
}
