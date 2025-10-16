import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div style="max-width:400px;margin:50px auto;padding:24px;border-radius:12px;background:#0a0f1a;color:white;">
      <h2 style="text-align:center;">Login</h2>
      <form (ngSubmit)="onSubmit()" #f="ngForm">
        <div style="margin:12px 0;">
          <label>Username</label>
          <input [(ngModel)]="username" name="username" required class="input"/>
        </div>
        <div style="margin:12px 0;">
          <label>Password</label>
          <input [(ngModel)]="password" type="password" name="password" required class="input"/>
        </div>
        <button type="submit" class="btn">Sign In</button>
        <div *ngIf="error" style="color:red;margin-top:10px;text-align:center;">{{error}}</div>
      </form>
    </div>
  `,
  styles: [`
    .input {
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      border: none;
      margin-top: 4px;
    }
    .btn {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: none;
      border-radius: 8px;
      background-color: #60a5fa;
      color: black;
      font-weight: bold;
      cursor: pointer;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigateByUrl('/transfer');
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
