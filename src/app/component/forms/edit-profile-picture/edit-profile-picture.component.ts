import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/model/Member';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-edit-profile-picture',
  templateUrl: './edit-profile-picture.component.html',
  styleUrls: ['./edit-profile-picture.component.css'],
})
export class EditProfilePictureComponent {
  @ViewChild('picture') picture!: ElementRef;
  user: Member = this.store.user;
  selectedFile: File | null = null;
  form: FormGroup;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private memberService: MemberService,
    private http: HttpClient,
  ) {
    this.form = this.fb.group({
      file: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post<Member>(`http://localhost:8080/api/members/${this.user.id}/picture`, formData).subscribe({
        next: (response: Member) => {
          this.store.setUser(response);
          console.log('Profile picture updated successfully');
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
    });
    } else {
      console.log('No file selected');
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    if (file) {
      this.selectedFile = file[0];
      const url = URL.createObjectURL(this.selectedFile);
      this.picture.nativeElement.src = url;
    }
  }
}
