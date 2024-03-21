import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css']
})
export class EditInfosComponent {
  profileForm: FormGroup;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private memberService: MemberService,
  ) {
    const user = this.store.user;
    this.profileForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      birthDate: [user.birthDate, Validators.required],
      location: [user.location, Validators.required],
      profession: [user.profession, Validators.required],
      bio: [user.bio, Validators.required],
    });
  }

  updateProfile() {
    if (!this.profileForm.valid) {
      console.log('Invalid form');
      return;
    }
    this.memberService
      .updateProfile(this.profileForm.value, this.store.user.id)
      .subscribe({
        next: (data) => {
          this.store.updateUser(this.store.user.email);
          console.log(data);
          this.successMessage = 'Profile data saved successfully!';
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
