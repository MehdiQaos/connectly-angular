import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/service/store.service';
import { AuthService } from 'src/app/service/auth.service';
import { MemberService } from 'src/app/service/member.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css'],
})
export class EditPasswordComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;
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
    this.errorMessage = null;
  }

  updatePassword() {
    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('password')?.value;
    const id = this.store.user.id;
    this.errorMessage = null;
    this.memberService.updatePassword(oldPassword, newPassword, id).subscribe({
      next: () => {
        this.auth.logout();
      },
      error: (err) => {
        this.errorMessage = err.error.errors.password;
      },
    });
  }
}
