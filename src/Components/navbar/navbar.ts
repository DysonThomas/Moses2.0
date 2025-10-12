import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public auth: Auth, private router: Router) {}
  logout() {
    this.auth.logout();
  }
  editProfile() {
    this.router.navigate(['/profile']);
  }
  backToHome() {
    this.router.navigate(['/']);
  }
  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }
}
