import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private memberService: MemberService,
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      location: ['', Validators.required],
      profession: ['', Validators.required],
      bio: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const user = this.store.user;
    this.profileForm.patchValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      location: user.location,
      profession: user.profession,
      bio: user.bio,
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
          // this.store.updateUser(this.profileForm.get('email')?.value);
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
