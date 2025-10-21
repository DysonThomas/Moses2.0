import { Component, Input } from '@angular/core';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { AddproductModal } from '../addproduct-modal/addproduct-modal';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productmaster',
  imports: [FormsModule, AddproductModal],
  templateUrl: './productmaster.html',
  styleUrl: './productmaster.css',
})
export class Productmaster {
  @Input() church_ID: string = '';
  products: any[] = [];
  editingproductId: any = null;
  newAmount: number | null = null;
  isModalOpen: boolean = false;
  constructor(private api: Api, private auth: Auth, private snackBar: MatSnackBar) {}
  ngOnInit() {
    const token = this.auth.getToken();
    this.api.getProductsByChurchId(token, this.church_ID).subscribe((products) => {
      this.products = products;
      console.log('Fetched Products:', this.products);
    });
  }
  manageButton(product: any) {
    this.editingproductId = product;
  }
  delete(productId: string) {
    this.editingproductId = null;
  }
  update(productId: string) {
    if (this.newAmount != null) {
      console.log('Updating product ID:', productId, 'with new amount:', this.newAmount);
      this.api
        .updateProductPrice(this.auth.getToken(), productId, { price: this.newAmount! })
        .subscribe((response) => {
          console.log('Product price updated successfully:', response);
          this.editingproductId = null;
          this.newAmount = null;
          // Refresh the product list to reflect the updated price
          this.api
            .getProductsByChurchId(this.auth.getToken(), this.church_ID)
            .subscribe((products) => {
              this.products = products;
            });
        });
    } else {
      this.showAlert('Please Fill The Amount');
    }
  }
  deleteProduct(productId: string) {
    console.log('Deleting product ID:', productId);
    this.api.deleteProduct(this.auth.getToken(), productId).subscribe((response) => {
      console.log('Product deleted successfully:', response);
      // Refresh the product list to reflect the deletion
      this.api.getProductsByChurchId(this.auth.getToken(), this.church_ID).subscribe((products) => {
        this.products = products;
      });
    });

    this.editingproductId = null;
  }
  openModal() {
    console.log(this.isModalOpen);
    console.log('Opening Add Product Modal');
    this.isModalOpen = !this.isModalOpen;
  }
  handleClose() {
    this.isModalOpen = !this.isModalOpen;
    this.ngOnInit();
  }
  showAlert(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
