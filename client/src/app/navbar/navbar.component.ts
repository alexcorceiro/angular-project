import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any = {};


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    // Vous devrez ajouter la logique pour récupérer le token d'authentification de l'utilisateur si nécessaire.
    this.http.get('http://localhost:4000/api/users/profile', { withCredentials: true }).subscribe(
      (userData: any) => {
        this.user = userData;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.router.navigate(['/login']);
      }
    );
  }
}
