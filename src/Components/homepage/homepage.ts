import { Component, NgZone } from '@angular/core';
import { Api } from '../../services/api';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Spinner } from '../spinner/spinner';
import { Paymentservice } from '../../services/paymentservice';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var Razorpay: any;

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
  constructor(
    private api: Api,
    public auth: Auth,
    private paymentService: Paymentservice,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}
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
            console.log('Fetched Products:', this.products);
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
      console.log('My Products:', this.Myproducts);
      console.log('All Products:', this.products);
      // Clear the form fields
      this.selectedType = '';
      this.name = '';
      this.Myproducts = this.Myproducts.map((mp) => {
        const matched = this.products.find((p) => p.product_id == mp.type);
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
  pay() {
    this.isLoading = true;
    console.log(this.profileData);
    const amount = this.totalAmount;
    const currency = 'INR';
    this.paymentService
      .createOrder(this.auth.getToken(), amount, currency, this.profileData.church_id)
      .subscribe({
        next: (order) => {
          console.log('Order created successfully:', order.amount);
          const options = {
            key: order.key, // Replace with your Razorpay API key
            amount: order.amount,
            currency: order.currency,
            name: this.profileData.churchName,
            description: 'Powered by Moses 2.0',
            order_id: order.id,
            handler: (response: any) => {
              console.log('Payment ID:', response.razorpay_payment_id);
              console.log('Order ID:', response.razorpay_order_id);
              console.log('Signature:', response.razorpay_signature);
              // Call API to add order details
              this.api
                .addOrderDetails(this.auth.getToken(), {
                  user_id: this.profileData.user_ID,
                  amount: order.amount / 100, // Convert to main currency unit
                  currency: order.currency,
                  status: 'paid',
                  church_id: this.profileData.church_id,
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                  products: this.Myproducts,
                })
                .subscribe({
                  next: (res) => {
                    console.log(res);
                    console.log('Order details added successfully');
                    this.ngZone.run(() => {
                      this.Myproducts = [];
                      this.totalAmount = 0;
                      this.isLoading = false;
                      this.showAlert('Payment Successful and Order Placed!');
                    });
                  },
                  error: (err) => {
                    console.error('Error adding order details:', err);
                  },
                });
            },
            prefill: {
              name: this.profileData.user_name,
              email: this.profileData.email ? this.profileData.email : '',
            },
            theme: {
              color: '#3399cc',
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        },
        error: (err) => {
          console.error('Error creating order:', err);
        },
      });
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
  showAlert(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
