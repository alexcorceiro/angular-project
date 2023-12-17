import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private registerUrl = 'http://localhost:4000/api/users/register';
  private loginUrl = 'http://localhost:4000/api/users/login'; // Ajoutez l'URL pour la connexion

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(this.registerUrl, user);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(this.loginUrl, credentials, { withCredentials: true });
  }
}
