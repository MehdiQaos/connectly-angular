import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/model/Member';
import { ImageService } from 'src/app/service/image.service';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';
import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

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

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private memberService: MemberService,
    public imageService: ImageService
  ) {
    this.form = this.fb.group({
      file: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.memberService
        .updateProfilePicture(this.selectedFile, this.user.id)
        .subscribe({
          next: (response: Member) => {
            this.store.setUser(response);
            alertSuccess('Picture changed successfully');
          },
          error: () => {
            alertFailure('Profile picture could not be updated');
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
      this.picture.nativeElement.style.display = 'block';
    }
  }
}
