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
  name: any;
  showEdittext: boolean = false;
  Myproducts: any[] = [];
  editingProductId: number | null = null;
  contributionAmount: number | null = null;
  new_price: number | null = null;
  totalAmount: number = 0;
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
        this.api.getProductsByChurchId(token, this.profileData.church_id).subscribe({
          next: (productRes) => {
            this.products = productRes;
          },
          error: (err) => {},
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = true;
      },
    });
    // Load Type of Products
  }
  editamount(prodId: any) {
    this.editingProductId = prodId;
  }
  savenewamount(product: any) {
    const amount = Number(this.contributionAmount);
    const minPrice = Number(product.price);

    if (amount < minPrice) {
      alert('Amount must be at least ₹' + product.price);
      this.contributionAmount = null;
      this.editingProductId = null;
      return;
    }

    if (amount >= minPrice) {
      product.new_price = amount;
      this.new_price = product.new_price;
      this.contributionAmount = null;
      this.editingProductId = null;
    }
    this.findSum();
  }
  addItem() {
    if (this.selectedType && this.name) {
      this.Myproducts.push({ type: this.selectedType, name: this.name });
      // Clear the form fields
      this.selectedType = '';
      this.name = '';
      this.Myproducts = this.Myproducts.map((mp) => {
        const matched = this.products.find((p) => p.id == mp.type);
        return {
          ...mp,
          id: Date.now() + Math.floor(Math.random() * 10000), // Unique ID for tracking
          product_name: matched ? matched.product_name : 'Unknown',
          price: matched ? matched.price : '0.00',
        };
      });
    }
    // Function to find sun of item in Myprodcuts array
    this.findSum();
  }
  findSum() {
    this.totalAmount = this.Myproducts.reduce(
      (sum, item) => sum + (Number(item.new_price) || Number(item.price) || 0),
      0
    );
  }

  ondeleteClick(product: any) {
    this.Myproducts = this.Myproducts.filter((p) => p.id !== product.id);
    this.findSum();
  }
}
