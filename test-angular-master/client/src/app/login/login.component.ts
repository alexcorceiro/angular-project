import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private afAuth: AngularFireAuth, private router: Router) {}


  async login() {
    this.errorMessage = '';
    try {
      await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
      this.router.navigate(['/profile']);
    } catch (error : any ) {
      this.errorMessage = error.message;
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
