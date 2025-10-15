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

  // Called when child emits login data
  receiveData(data: { token: string; userId: string }) {
    // Fetch profile immediately after receiving login data
    this.fetchUserProfile(data.token, data.userId);
  }

  ngOnInit() {
    // Check if user is already logged in (page refresh scenario)
    const userId = this.auth.getUserId();
    const token = this.auth.getToken();

    if (userId && token) {
      this.fetchUserProfile(token, userId);
    } else {
    }
  }

  fetchUserProfile(token: string, userId: string) {
    this.api.getUser(token, userId).subscribe({
      next: (data) => {
        this.role = data.role;
        this.auth.setUser(data);
      },
      error: (error) => {
        console.error('Failed to fetch profile:', error);
      },
    });
  }
}
