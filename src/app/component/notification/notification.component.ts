import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event.model';
import { EventsService } from 'src/app/service/events.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() event!: Event;
  @Output() deleteEvent = new EventEmitter<number>();

  constructor(
    private eventService: EventsService,
    private router: Router,
  ) {}

  calculatePeriod(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      'year': seconds / 31536000,
      'month': seconds / 2592000,
      'week': seconds / 604800,
      'day': seconds / 86400,
      'hour': seconds / 3600,
      'minute': seconds / 60
    };

    let counter;
    for (const [key, value] of Object.entries(intervals)) {
      counter = Math.floor(value);
      if (counter > 1) {
        return counter + ' ' + key + 's ago';
      } else if (counter === 1) {
        return counter + ' ' + key + ' ago';
      }
    }
    return 'just now';
  }

  onDeleteEvent() {
    this.eventService.deleteEvent(this.event.id).subscribe({
      next: () => {
        this.deleteEvent.emit(this.event.id);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  checkEvent() {
    switch (this.event.eventType) {
      case 'COMMENT':
        this.router.navigate([`/posts/${this.event.postId}`]);
        break;
      case 'LIKE':
        this.router.navigate([`/posts/${this.event.postId}`]);
        break;
      case 'FOLLOW':
        this.router.navigate([`/profile/${this.event.initiatingMember.id}`]);
        break;
      default:
        break;
    }
    this.onDeleteEvent();
  }
}
