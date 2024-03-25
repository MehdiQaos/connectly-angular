import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url: string;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) { 
    this.url = envService.ApiUrl + "/events";
  }

  getMemberEvents(memberId: number): Observable<Event[]> {
    const url = `${this.url}/member/${memberId}`;
    return this.httpClient.get<Event[]>(url);
  }

  deleteEvent(id: number): Observable<Event> {
    const url = `${this.url}/${id}`;
    return this.httpClient.delete<Event>(url);
  }
}
