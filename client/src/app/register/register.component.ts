import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authificate.service';
import { ToastrService } from 'ngx-toastr';


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
    private AuthenticationService: AuthenticationService, private toastr: ToastrService,
    private router: Router
  ) {}

  register() {
    const user = {
      prenom: this.prenom,
      nom: this.nom,
      dateNaissance: this.dateNaissance,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.AuthenticationService.register(user).subscribe({
      next: (response) => {
        this.toastr.success('Inscription réussie');
        this.router.navigate(['/home']);      },
      error: (error) => {
        this.errorMessage = error.message;
        this.toastr.error('Erreur lors de l’inscription');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
