import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
const BASIC_URL = "http://localhost:8080"
const AUTH_HEADER = "Authorization"

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  registerClient(signupClientDTO: any): Observable<any>{
    return this.http.post(`${BASIC_URL}/client/sign-up`, signupClientDTO)
  }

  registerCompany(signupCompanyDTO: any): Observable<any>{
    return this.http.post(`${BASIC_URL}/company/sign-up`, signupCompanyDTO)
  }

  login(username:String, password: String): Observable<any>{
    return this.http.post(`${BASIC_URL}/company/sign-up`, {username, password}, {observe: "response"})
    .pipe(
      map((res: HttpResponse<any>)=>{
            console.log(res.body)
            const tokenLength = res.headers.get(AUTH_HEADER)?.length
            const bearToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength)
            return res;
      })
    )
  }

}
