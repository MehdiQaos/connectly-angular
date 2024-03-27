import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/Report';
import { ImageService } from 'src/app/service/image.service';
import { PostService } from 'src/app/service/post.service';
import { ReportService } from 'src/app/service/report.service';
import { alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  showRemoveModal = false;

  constructor(
    private reportService: ReportService,
    private postService: PostService,
    public imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getAllReports().subscribe({
      next: (data: Report[]) => {
        this.reports = data;
      }
    });
  }

  toggleRemoveModal() {
    this.showRemoveModal = !this.showRemoveModal;
  }

  removePost() {
    this.postService.removePost(this.reports[0].reportedPost.id).subscribe({
      next: () => {
        console.log('Post removed');
        alertSuccess('Post removed');
        this.toggleRemoveModal();
        this.loadReports();
      }
    });
  }

  ignoreReport() {
    this.reportService.deleteReport(this.reports[0].id).subscribe({
      next: () => {
        console.log('Report ignored');
        this.loadReports();
      }
    });
  }
}
