import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../model';
const BASIC_URL = "http://localhost:8080"
const AUTH_HEADER = "Authorization"

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoginUser: boolean = false;
  isLoginClient: boolean = false;
  isLoginCompany: boolean = false;

  constructor(private http: HttpClient) { }

  registerClient(signupClientDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/client/sign-up`, signupClientDTO)
  }

  registerCompany(signupCompanyDTO: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/company/sign-up`, signupCompanyDTO)
  }

  login(username: String, password: String): Observable<any> {
    return this.http.post(`${BASIC_URL}/login`, { username, password }, { observe: "response" })
  }

  authDetailsStore(token: any, userDetails: any) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userDetails));
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserDetails(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearAuthDetails(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getLoginUser(): boolean {
     this.isLoginUser = !!this.getAuthToken();
     return this.isLoginUser;
  }

  getLoginClient(): boolean {
    console.log(this.getUserDetails().role, Role.ROLE_COMPANY)
    this.isLoginClient = this.getUserDetails().role == Role.ROLE_CLIENT;
    return this.isLoginClient;
  }

  getLoginCompany(): boolean {
    this.isLoginClient = this.getUserDetails().role == Role.ROLE_COMPANY;
    return this.isLoginClient;
  }

}
