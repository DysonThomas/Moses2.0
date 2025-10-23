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
  verifyToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}protected`);
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
  deleteProduct(token: string, product_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}deleteproduct/${product_id}`, { headers });
  }
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}getallproducts`, {});
  }
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}getproducts`, {});
  }
  // add neew product on to product table based on church id
  addNewProduct(
    token: string,
    productData: { church_id: string; product_id: number; price: number; isRegular: boolean }
  ): Observable<any> {
    console.log('Adding new product with data:', productData);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}addproduct`, productData, { headers });
  }
  // add razorpay keys for church
  addRazorpayKeys(
    token: string,
    church_id: string,
    keysData: { key_id: string; key_secret: string }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const body = { ...keysData, church_id };
    return this.http.post(`${this.apiUrl}addrazorpaykeys`, body, { headers });
  }
  // get razoorpay key using church id
  getRazorpayKey(token: string, church_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getrazorpaykeys/${church_id}`, { headers });
  }
  // api to delete razorpay keys using church id
  deleteRazorpayKeys(token: string, church_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}deleterazorpaykey/${church_id}`, { headers });
  }
  // api to add order details after payment
  addOrderDetails(
    token: string,
    orderData: {
      user_id: string;
      amount: number;
      currency: string;
      status: string;
      church_id: string;
      order_id: string;
      payment_id: string;
      signature: string;
      products: any[];
    }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.apiUrl}addorder`, orderData, { headers });
  }
  // fetch orders by user id
  getOrdersByUserId(token: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}getuserorders/${user_id}`, { headers });
  }
  // getorder by checking church id and date between 2 dates post as data
  getallOrder(token: string, church_id: string, fromDate: string, toDate: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      `${this.apiUrl}getchurchorders`,
      { church_id, fromDate, toDate },
      { headers }
    );
  }
  getspecificorder(
    token: string,
    church_id: string,
    fromDate: string,
    toDate: string,
    pType: number | string[]
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    console.log(token, church_id, fromDate, toDate, pType);
    return this.http.post(
      `${this.apiUrl}getspecificorders`,
      { church_id, fromDate, toDate, pType },
      { headers }
    );
  }
  updateOrderStatus(
    type: number,
    fromDate: string,
    toDate: string,
    newStatus: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}updateProductStatusByType/`, {
      type,
      fromDate,
      toDate,
      newStatus,
    });
  }
}
