import { Component } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-homepage',
  imports: [FormsModule, Spinner],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  profileData: any;
  products: any[] = [];
  isLoading: boolean = true;
  selectedType: any;
  constructor(private api: Api, public auth: Auth) {}
  ngOnInit() {
    // Load Profile Data
    const token = this.auth.getToken();
    const userId = this.auth.getUserId();
    if (!userId) return;
    if (!token) return;
    this.api.getProfile(token, userId).subscribe({
      next: (res) => {
        this.profileData = res;
        console.log(this.profileData.church_id);
        this.api.getAllChurch().subscribe({
          next: (churchRes) => {
            const church = churchRes.find((c: any) => c.church_id === this.profileData.church_id);
            console.log('Matching church:', church);
            if (church) {
              this.profileData.churchName = church.name;
            } else {
              this.profileData.churchName = 'Unknown Church';
            }
            console.log('Church data:', churchRes);
            console.log('User profile with church name:', this.profileData);
          },
        });
        this.api.getProductsByChurchId(token, this.profileData.church_id).subscribe({
          next: (productRes) => {
            this.products = productRes;
            console.log('Products:', this.products);
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = true;
      },
    });
    // Load Type of Products
  }
}
