import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule, CommonModule, CurrencyPipe],
  template: `
    <div style="max-width:500px;margin:40px auto;padding:24px;border-radius:12px;background:#0a0f1a;color:white;">
      <h2 style="text-align:center;">Account Dashboard</h2>
      <div style="text-align:center;margin:20px 0;">
        <h3>Your Balance: {{ balance | currency:'USD' }}</h3>
      </div>

      <form (ngSubmit)="onTransfer()" #tForm="ngForm" style="margin-top:20px;">
        <label>Recipient:</label>
        <input [(ngModel)]="recipient" name="recipient" required class="input"/>

        <label>Amount:</label>
        <input [(ngModel)]="amount" name="amount" type="number" required min="1" class="input"/>

        <button type="submit" class="btn">Transfer</button>
      </form>

      <div *ngIf="message" style="margin-top:20px;text-align:center;color:lightgreen;">
        {{ message }}
      </div>

      <button (click)="logout()" class="logout">Logout</button>
    </div>
  `,
  styles: [`
    .input {
      width: 100%;
      padding: 8px;
      margin: 8px 0;
      border-radius: 8px;
      border: none;
    }
    .btn {
      width: 100%;
      padding: 10px;
      background-color: #60a5fa;
      border: none;
      border-radius: 8px;
      margin-top: 10px;
      font-weight: bold;
      color: black;
      cursor: pointer;
    }
    .logout {
      width: 100%;
      padding: 10px;
      background-color: #e11d48;
      border: none;
      border-radius: 8px;
      margin-top: 20px;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
  `]
})
export class TransferComponent {
  balance = 1000;
  recipient = '';
  amount = 0;
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  onTransfer() {
    if (this.amount <= 0 || this.amount > this.balance) {
      this.message = 'Invalid amount.';
      return;
    }
    this.balance -= this.amount;
    this.message = `Transferred $${this.amount.toFixed(2)} to ${this.recipient}.`;
    this.amount = 0;
    this.recipient = '';
  }

  logout() {
    this.auth.logout();
  }
}
