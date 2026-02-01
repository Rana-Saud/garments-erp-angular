import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router)
  fb = inject(FormBuilder);

  showPassword = false;

  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.auth.login(
      this.loginForm.value.username!,
      this.loginForm.value.password!
    )) {
      this.router.navigate(['/dashboard']);
    }
  }

}
