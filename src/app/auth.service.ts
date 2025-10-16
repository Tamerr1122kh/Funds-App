import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'token';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Mock login — you can later replace this with a real backend API call
    if (username === 'demo' && password === 'password') {
      localStorage.setItem(this.tokenKey, 'mock-jwt-token');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl('/login');
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
