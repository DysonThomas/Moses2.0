import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../Components/login-component/login-component';
import { Homepage } from '../Components/homepage/homepage';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../Components/navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, Homepage, FormsModule, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  showProfile: boolean = false;
  protected readonly title = signal('moses2.0');
  constructor(public auth: Auth, private router: Router) {}

  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }
}
