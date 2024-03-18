import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-imageform',
  templateUrl: './imageform.component.html',
  styleUrls: ['./imageform.component.css']
})
export class ImageformComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files?.[0] || null;
  }

  onSubmit(event: any) {
    event.preventDefault();
    const fd = new FormData();
    if (this.selectedFile) {
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.http.post('http://localhost:8080/api/members/1/profile-picture', fd)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

}
