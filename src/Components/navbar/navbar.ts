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
  role: number | null = null;
  constructor(public auth: Auth, private router: Router) {}
  ngOnInit() {
    this.role = this.auth.getRole();
  }
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
