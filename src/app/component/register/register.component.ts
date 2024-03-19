import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      password: '',
      confirmPassword: ''
    });
  }

  submit(event: Event): void {
    event.preventDefault();
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (res) => this.router.navigate(['/login'])
    });
  }
}