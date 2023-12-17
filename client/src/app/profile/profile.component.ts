import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  // infos en dure de l'utilisateur
  users = {
    name: 'Anya Forger',
    email: 'anyaforger@example.com',
    age: 20,
    country: 'Française',
    // Ajoutez d'autres informations d'utilisateur si nécessaire
  };
  editing: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    // ajouter la logique pour récupérer le token d'authentification de l'utilisateur si nécessaire
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

  handleImageError(event: ErrorEvent) {
    console.error('Error loading image:', event);
    // définir une image par défaut si l'image principale ne se charge pas
    this.user.image = 'path-to-default-image.png';
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveProfile(newFirstName: string, newLastName: string, newEmail: string, newBirthdate: Date): void {
    this.http.put('http://localhost:4000/api/users/profile', {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      birthdate: newBirthdate 
    }).subscribe(
      () => {
        console.log('Profile updated successfully!');
        this.editing = false;
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  tasklist() {
    this.router.navigate(['/todolist']);
  }
}
