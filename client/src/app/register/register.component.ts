import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  prenom: string = '';
  nom: string = '';
  email: string = '';
  dateNaissance: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      // Here, the user is created and you can now save additional information to Firestore
      await this.firestore.collection('users').doc(result.user?.uid).set({
        prenom: this.prenom,
        nom: this.nom,
        email: this.email,
        dateNaissance : this.dateNaissance
      });

      console.log(result);
      // Navigate to a different page if needed
      this.router.navigate(['/profile']);
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
