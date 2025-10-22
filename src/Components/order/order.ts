import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Api } from '../../services/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [DatePipe],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order {
  constructor(private route: Router, private auth: Auth, private api: Api) {}
  myOrders: any[] = [];
  ngOnInit() {
    const userId = this.auth.getUserId();
    this.api.getOrdersByUserId(this.auth.getToken(), userId).subscribe({
      next: (data) => {
        this.myOrders = data.map((order: any) => {
          let productsArray = [];

          if (order.products) {
            // Check if it's already an array
            if (Array.isArray(order.products)) {
              productsArray = order.products;
            }
            // If it's an object, convert to array
            else if (typeof order.products === 'object') {
              productsArray = Object.values(order.products);
            }
          }

          return {
            ...order,
            products: productsArray,
          };
        });

        console.log('Processed Orders:', this.myOrders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }
}
