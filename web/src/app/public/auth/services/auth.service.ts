import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm, RegisterForm } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public register(registerForm: RegisterForm) {
    return this.http.post(`${environment.apiUrl}/user/register`, registerForm);
  }

  public login(loginForm: LoginForm) {
    return this.http.post(`${environment.apiUrl}/user/login`, loginForm);
  }

  public getRoles() {
    return this.http.get(`${environment.apiUrl}/user/roles`);
  }
}
