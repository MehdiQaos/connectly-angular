import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';
import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-edit-infos',
  templateUrl: './edit-infos.component.html',
  styleUrls: ['./edit-infos.component.css'],
})
export class EditInfosComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;

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
  ngOnInit(): void {
    this.disableForm();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.enableForm();
    } else {
      this.disableForm();
    }
  }

  updateProfile() {
    if (!this.profileForm.valid) {
      console.log('Invalid form');
      return;
    }
    this.memberService
      .updateProfile(this.profileForm.value, this.store.user.id)
      .subscribe({
        next: () => {
          this.store.updateUser(this.store.user.email);
          alertSuccess('Profile updated successfully');
        },
        error: () => {
          alertFailure('Profile could not be updated');
        },
      });
  }

  enableForm() {
    this.profileForm.get('firstName')?.enable();
    this.profileForm.get('lastName')?.enable();
    this.profileForm.get('birthDate')?.enable();
    this.profileForm.get('location')?.enable();
    this.profileForm.get('profession')?.enable();
    this.profileForm.get('bio')?.enable();
  }

  disableForm() {
    this.profileForm.get('firstName')?.disable();
    this.profileForm.get('lastName')?.disable();
    this.profileForm.get('birthDate')?.disable();
    this.profileForm.get('location')?.disable();
    this.profileForm.get('profession')?.disable();
    this.profileForm.get('bio')?.disable();
  }
}