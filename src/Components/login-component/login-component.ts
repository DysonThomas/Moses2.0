import { Component, Output, EventEmitter } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  profileData: any = {};
  @Output() dataEmitter = new EventEmitter<{ token: string; userId: string }>();
  constructor(private api: Api, public auth: Auth, private snackBar: MatSnackBar) {}
  isNewUser() {
    this.newUser = !this.newUser;
  }
  signup() {
    if (!this.SFullname || !this.SEmail || !this.SPassword || !this.selectedChurch) {
      this.showAlert('Please fill all the fields');
      return;
    }
    this.api
      .signup({
        username: this.SFullname,
        email: this.SEmail,
        password: this.SPassword,
      })
      .subscribe({
        next: (data) => {
          this.profileData = {
            user_id: data.user_id,
            username: this.SFullname,
            church_id: this.selectedChurch,
            dob: null,
            housename: '',
            place: '',
            district: '',
            state: '',
            country: '',
            gender: '',
            phone: '',
          };

          this.showAlert('Signup successful! Please log in.');

          this.api.addProfile(this.profileData).subscribe({
            next: (data) => {},
            error: (error) => {
              console.error('Adding profile failed:', error);
            },
          });
          this.newUser = false;
        },
        error: (error) => {
          console.error('Signup failed:', error);
        },
      });
  }
  login() {
    if (!this.email || !this.password) {
      this.showAlert('Please enter both email and password');
      return;
    }
    this.api.login({ email: this.email, password: this.password }).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        const datatoemit = { token: data.token, userId: data.user.id };
        this.dataEmitter.emit(datatoemit);
        this.auth.isLoggedIn.set(true);
      },
      error: (error) => {
        if (error.status === 401) {
          this.showAlert('Invalid email or password');
        }
      },
    });
  }
  showAlert(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  ngOnInit() {
    this.loading = true;
    this.api.getAllChurch().subscribe({
      next: (data) => {
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
