import { Component, Input } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { Api } from '../../services/api';
import { Shared } from '../../services/shared';
@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() userData: any = null;
  @Input() userRole: number | null = null;
  role: number | null = null;
  constructor(
    private api: Api,
    public auth: Auth,
    private router: Router,
    private shared: Shared
  ) {}
  ngOnChanges() {
    console.log('Navbar received userData:', this.userData);
    console.log('Navbar received userRole:', this.userRole);
  }
  logout(action: string) {
    this.auth.logout();
    this.shared.updateNavbarAction(action); //
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
  orderClick(action: string) {
    this.shared.updateNavbarAction(action); //
  }
}
