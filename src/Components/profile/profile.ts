import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { Spinner } from '../spinner/spinner';
import { FormsModule } from '@angular/forms';
``;
@Component({
  selector: 'app-profile',
  imports: [Spinner, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  token: any;
  userId: any;
  profileData: any;
  getData: boolean = false;
  constructor(private api: Api, public auth: Auth) {}
  ngOnInit(): void {
    this.token = this.auth.getToken();
    this.userId = this.auth.getUserId();
    this.api.getProfile(this.token, this.userId).subscribe({
      next: (res) => {
        this.profileData = res;

        this.getData = true;
        this.api.getUserById(this.token, this.userId).subscribe({
          next: (userRes) => {
            this.profileData = userRes;
            this.profileData.dob = userRes.dob ? userRes.dob.split('T')[0] : null;
          },
        });
        this.api.getAllChurch().subscribe({
          next: (churchRes) => {
            const church = churchRes.find((c: any) => c.church_id === this.profileData.church_id);

            if (church) {
              this.profileData.churchName = church.name;
            } else {
              this.profileData.churchName = 'Unknown Church';
            }
          },
        });
      },
      error: (err) => {},
    });
  }
  onSubmit() {
    delete this.profileData.email;
    delete this.profileData.password;

    this.api.updateProfile(this.token, this.profileData.user_ID, this.profileData).subscribe({
      next: (res) => {
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile. Please try again.');
      },
    });
  }
}
