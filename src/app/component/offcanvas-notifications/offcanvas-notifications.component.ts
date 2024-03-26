import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/model/event.model';
import { EventsService } from 'src/app/service/events.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-offcanvas-notifications',
  templateUrl: './offcanvas-notifications.component.html',
  styleUrls: ['./offcanvas-notifications.component.css']
})
export class OffcanvasNotificationsComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private eventsService: EventsService,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getMemberEvents(this.store.user.id).subscribe(events => {
      this.events = events;
    });
  }

  deleteEvent(id: number) {
    this.events = this.events.filter(event => event.id !== id);
  }
}