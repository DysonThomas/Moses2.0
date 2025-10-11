import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../Components/login-component/login-component';
import { Homepage } from '../Components/homepage/homepage';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, Homepage, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('moses2.0');
  constructor(public auth: Auth) {}
}
