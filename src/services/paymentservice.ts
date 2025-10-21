import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Paymentservice {
  private apiUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) {}
  createOrder(token: string, amount: number, currency: string, church_id: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}createorder`,
      { amount, currency, church_id },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}
