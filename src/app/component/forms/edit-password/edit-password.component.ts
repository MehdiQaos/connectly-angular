import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/service/store.service';
import { AuthService } from 'src/app/service/auth.service';
import { MemberService } from 'src/app/service/member.service';

import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css'],
})
export class EditPasswordComponent implements OnInit {
  form: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private memberService: MemberService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: [
          '',
          [Validators.required, Validators.minLength(6)],
        ],
      },
      { validator: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('passwordConfirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnInit(): void {
    this.form.get('oldPassword')?.disable();
    this.form.get('password')?.disable();
    this.form.get('passwordConfirmation')?.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.form.get('oldPassword')?.enable();
      this.form.get('password')?.enable();
      this.form.get('passwordConfirmation')?.enable();
    } else {
      this.form.get('oldPassword')?.disable();
      this.form.get('password')?.disable();
      this.form.get('passwordConfirmation')?.disable();
    }
  }

  updatePassword() {
    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('password')?.value;
    const id = this.store.user.id;
    this.memberService.updatePassword(oldPassword, newPassword, id).subscribe({
      next: () => {
        alertSuccess('Password updated successfully');
        this.auth.logout();
      },
      error: () => {
        alertFailure('Password could not be updated');
      },
    });
  }
}