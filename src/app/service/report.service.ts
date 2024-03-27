import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Report } from '../model/Report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string;

  constructor(
    private http: HttpClient,
    private env: EnvService
  ) {
    this.url = env.ApiUrl + "/reports"
  }

  reportPost(reportedPostId: number, reportingMemberId: number, reportReason: string) {
    return this.http.post(this.url, { reportedPostId, reportingMemberId, reportReason });
  }

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url);
  }

  deleteReport(reportId: number): Observable<void> {
    return this.http.delete<void>(this.url + "/" + reportId);
  }

  processReport(reportId: number): Observable<void> {
    return this.http.put<void>(this.url + "/" + reportId, {});
  }
}