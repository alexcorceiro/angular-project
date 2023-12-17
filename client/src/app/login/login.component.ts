import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authificate.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface ApiResponse {
  success: boolean;
  message?: string;
  // Autres propriétés de la réponse de l'API
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  loginForm: FormGroup;
form: any;

  constructor(private formBuilder: FormBuilder,private AuthenticationService: AuthenticationService, private router: Router, private toastr: ToastrService,) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    this.errorMessage = '';
    try {
      const loginData = {
        email: this.username,
        password: this.password
      };

      const response = await this.AuthenticationService.login(loginData);
      console.log(response);
      if (response) {
        this.toastr.success('Connexion réussie!');
        this.router.navigate(['/profile']);
      }
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'Erreur lors de la connexion au serveur';
      this.toastr.error(this.errorMessage);
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
