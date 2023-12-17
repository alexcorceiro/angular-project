import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent {
  title: string = '';
  description: string = '';
  image: File | null = null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  createPost() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    this.http.post('http://localhost:4000/api/post', formData, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('Post créé avec succès', response);
        this.toastr.success('Post créé avec succès');
        this.router.navigate(['/home']); // Redirige vers la page d'accueil
      },
      error: (error) => {
        console.error('Erreur lors de la création du post', error);
        this.toastr.error('Erreur lors de la création du post');
      }
    });
  }
}
