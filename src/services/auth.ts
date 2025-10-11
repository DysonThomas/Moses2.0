import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = signal(false);
  constructor() {
    const token = localStorage.getItem('token');
    this.isLoggedIn.set(!!token);
    console.log('Auth initialized. isLoggedIn:', this.isLoggedIn());
  }
  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }
}
