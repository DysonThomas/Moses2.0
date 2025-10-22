import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Auth } from '../../services/auth';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addproduct-modal',
  imports: [FormsModule],
  templateUrl: './addproduct-modal.html',
  styleUrl: './addproduct-modal.css',
})
export class AddproductModal {
  @Output() close = new EventEmitter<void>();
  isLoading: boolean = false;
  isRegular: boolean = false;
  products: any[] = [];
  amount: number | null = null;
  prodID: number | null = null;
  constructor(private api: Api, private auth: Auth, private snackBar: MatSnackBar) {}
  onClose() {
    this.close.emit();
  }
  @Input() churchId: string = '';
  @Input() activeProducts: any[] = [];

  ngOnInit() {
    this.isLoading = true;

    this.api.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log('Products fetched:', this.products);
    });
    this.isLoading = false;
    console.log('AddproductModal initialized with churchId:', this.activeProducts);
  }
  Save() {
    console.log(this.isRegular);
    if (this.prodID != null && this.amount != null) {
      this.api
        .addNewProduct(this.auth.getToken(), {
          church_id: this.churchId,
          product_id: this.prodID ?? 0,
          price: this.amount ?? 0,
          isRegular: this.isRegular,
        })
        .subscribe((response) => {
          console.log(response);
          this.showAlert(' Added Sucessfully');
          this.onClose();
        });
    } else {
      this.showAlert('Please Fill The Details');
    }
  }
  showAlert(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  isProductActive(productId: number): boolean {
    return this.activeProducts.some((p) => p.product_id === productId);
  }
}
