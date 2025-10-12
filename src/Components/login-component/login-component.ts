import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loading: boolean = false;
  churches: any[] = [];
  newUser: boolean = false;
  selectedChurch: any;
  error: string = '';
  SFullname: string = '';
  SEmail: string = '';
  SPassword: string = '';
  email: string = '';
  password: string = '';
  constructor(private api: Api, public auth: Auth) {}
  isNewUser() {
    console.log('Clicked');
    console.log(this.newUser);
    this.newUser = !this.newUser;
  }
  signup() {
    if (!this.SFullname || !this.SEmail || !this.SPassword || !this.selectedChurch) {
      alert('Please fill all the fields');
      return;
    }
    this.api
      .signup({
        username: this.SFullname,
        email: this.SEmail,
        password: this.SPassword,
        church_id: this.selectedChurch,
      })
      .subscribe({
        next: (data) => {
          console.log('Signup successful:', data);
          this.newUser = false;
        },
        error: (error) => {
          console.error('Signup failed:', error);
        },
      });
  }
  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (data) => {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('churchID', data.user.church_id);
        this.auth.isLoggedIn.set(true);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
  ngOnInit() {
    this.loading = true;
    this.api.getAllChurch().subscribe({
      next: (data) => {
        console.log('Churches:', data);
        this.churches = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed To load churches';
        this.loading = false;
      },
    });
  }
}
