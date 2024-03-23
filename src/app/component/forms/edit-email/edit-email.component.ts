import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MemberService } from 'src/app/service/member.service';
import { StoreService } from 'src/app/service/store.service';

import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  styleUrls: ['./edit-email.component.css'],
})
export class EditEmailComponent implements OnInit {
  emailForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private memberService: MemberService,
    private auth: AuthService,
  ) {
    const user = this.store.user;

    this.emailForm = this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    this.emailForm.get('email')?.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.emailForm.get('email')?.disabled)
      this.emailForm.get('email')?.enable();
    else this.emailForm.get('email')?.disable();
  }

  updateEmail() {
    const id = this.store.user.id;
    const email = this.emailForm.get('email')?.value;
    this.memberService.updateEmail(email, id).subscribe({
      next: () => {
        this.auth.logout();
        alertSuccess('Email updated successfully');
      },
      error: (err) => {
        console.error(err);
        alertFailure('Email could not be updated');
      },
    });
  }
}
