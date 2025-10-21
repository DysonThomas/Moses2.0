import { Component, Input } from '@angular/core';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-managepayment',
  imports: [FormsModule],
  templateUrl: './managepayment.html',
  styleUrl: './managepayment.css',
})
export class Managepayment {
  constructor(private apiService: Api, private authService: Auth) {}
  @Input() church_ID: string = '';
  isShowKeysForm: boolean = false;
  KeysData: any = { key_id: '', key_secret: '' };
  ngOnInit() {
    this.apiService.getRazorpayKey(this.authService.getToken(), this.church_ID).subscribe(
      (response) => {
        this.isShowKeysForm = false;
        this.KeysData = response;
        console.log('Fetched Razorpay keys:', this.KeysData);
      },
      (error) => {
        if (error.status === 404) {
          this.isShowKeysForm = true;
        } else {
          console.error('Error fetching Razorpay keys:', error.status);
        }
      }
    );
  }
  saveKeys() {
    console.log('Saving Razorpay keys:', this.KeysData);
    this.apiService
      .addRazorpayKeys(this.authService.getToken(), this.church_ID, this.KeysData)
      .subscribe(
        (response) => {
          console.log('Razorpay keys saved successfully:', response);
          this.ngOnInit();
        },
        (error) => {
          console.error('Error saving Razorpay keys:', error);
        }
      );
  }
  deleteKey() {
    this.apiService.deleteRazorpayKeys(this.authService.getToken(), this.church_ID).subscribe(
      (response) => {
        console.log('Razorpay keys deleted successfully:', response);
        this.isShowKeysForm = true;
        this.ngOnInit();
      },
      (error) => {
        console.error('Error deleting Razorpay keys:', error);
      }
    );
  }
}
