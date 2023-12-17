import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  async login() {
    this.errorMessage = '';
    try {
      const loginData = {
        email: this.username, // Assurez-vous d'utiliser 'email' si c'est ce que l'API attend
        password: this.password
      };

      console.log("Data: " + JSON.stringify(loginData));

      const response = await this.http.post<ApiResponse>('http://localhost:4000/api/users', loginData, { withCredentials: true }).toPromise();
      console.log(response)
      if (response ) {
        this.toastr.success('Connexion réussie!');
        this.router.navigate(['/profile']);
      }
    } catch (error: any) {
      // Utilisez le message d'erreur renvoyé par l'API
      this.toastr.error(error.error?.message || 'Erreur lors de la connexion au serveur');
    }
  }


  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
