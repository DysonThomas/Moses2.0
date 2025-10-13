import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../Components/login-component/login-component';
import { Homepage } from '../Components/homepage/homepage';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../Components/navbar/navbar';
import { Router } from '@angular/router';
import { Api } from '../services/api';
import { Churchhomepage } from '../Components/churchhomepage/churchhomepage';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, Homepage, FormsModule, Navbar, Churchhomepage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  showProfile: boolean = false;
  role: number | null = null;
  protected readonly title = signal('moses2.0');
  constructor(public auth: Auth, private router: Router, private api: Api) {}

  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }
  ngOnInit() {
    const userId = this.auth.getUserId();
    const token = this.auth.getToken();
    if (userId && token) {
      this.api.getUser(token, userId).subscribe({
        next: (data) => {
          console.log('Fetched user profile on app init:', data);
          this.role = data.role;
          this.auth.setUser(data);
          console.log('User role:', this.role);
        },
        error: (error) => {
          console.error('Failed to fetch profile:', error);
        },
      });
    } else {
      console.log('No user ID or token found in localStorage');
    }
  }
}
