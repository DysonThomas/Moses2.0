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
  signup(userData: {
    username: string;
    email: string;
    password: string;
    church_id: string;
  }): Observable<any> {
    console.log(userData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'register', userData, { headers });
  }
  // Login method
  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'login', credentials, { headers });
  }
}
