import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) {}
  // For Drop down
  getAllChurch(): Observable<any> {
    return this.http.get(this.apiUrl + 'getallChurch');
  }
  // Sign up method
  signup(userData: { username: string; email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'register', userData, { headers });
  }
  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'login', credentials, { headers });
  }
  getProfile(token: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getauser/${user_id}`, { headers });
  }
  // Get role of user by id
  getUser(token: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getrole/${user_id}`, { headers });
  }
  // Get prices of products of each church by church id and pass token
  getProductsByChurchId(token: string, church_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getproductsbychurch/${church_id}`, { headers });
  }
  addProfile(profileData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl + 'adduserprofile', profileData, { headers });
  }
  updateProfile(token: string, user_id: string, profileData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Clean up empty strings before sending
    const cleanedData = { ...profileData };
    Object.keys(cleanedData).forEach((key) => {
      if (cleanedData[key] === '') {
        cleanedData[key] = null;
      }
    });

    return this.http.put(`${this.apiUrl}updateuserprofile/${user_id}`, cleanedData, { headers });
  }
  // get user by id
  getUserById(token: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getuserprofile/${user_id}`, { headers });
  }
  // api to fetch church id by user id
  getChurchIdByUserId(token: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getchurchidbyuserid/${user_id}`, { headers });
  }

  // api to update the product price using product id
  updateProductPrice(
    token: string,
    product_id: string,
    priceData: { price: number }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrl}updateproductprice/${product_id}`, priceData, { headers });
  }
}
