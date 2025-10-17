import { Component, Input } from '@angular/core';
import { Api } from '../../services/api';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productmaster',
  imports: [FormsModule],
  templateUrl: './productmaster.html',
  styleUrl: './productmaster.css',
})
export class Productmaster {
  @Input() church_ID: string = '';
  products: any[] = [];
  editingproductId: any = null;
  newAmount: number | null = null;
  constructor(private api: Api, private auth: Auth) {}
  ngOnInit() {
    console.log('Church ID in Productmaster:', this.church_ID);
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
    console.log('Updating product ID:', productId, 'with new amount:', this.newAmount);
    this.api
      .updateProductPrice(this.auth.getToken(), productId, { price: this.newAmount! })
      .subscribe((response) => {
        console.log('Product price updated successfully:', response);
        this.editingproductId = null;
        // Refresh the product list to reflect the updated price
        this.api
          .getProductsByChurchId(this.auth.getToken(), this.church_ID)
          .subscribe((products) => {
            this.products = products;
          });
      });
  }
}
