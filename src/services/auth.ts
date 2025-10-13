import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = signal(false);
  private userData: any;
  constructor() {
    const token = localStorage.getItem('token');
    this.isLoggedIn.set(!!token);
    console.log('Auth initialized. isLoggedIn:', this.isLoggedIn());
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }
  setUser(data: any) {
    this.userData = data.role;
    // localStorage.setItem('role', this.userData.role);
    localStorage.setItem('user', this.userData);
    // optional
  }
  getUser() {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    }
    return this.userData;
  }
  getRole() {
    return this.getUser().role;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }
}
