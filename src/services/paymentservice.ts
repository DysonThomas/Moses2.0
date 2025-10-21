import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Paymentservice {
  private apiUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) {}
  createOrder(amount: number, currency: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { amount, currency });
  }
}
