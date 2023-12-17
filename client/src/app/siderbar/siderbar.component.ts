import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent {

  constructor(private router: Router) {}

  navigateToAddPost() {
    this.router.navigate(['/addpost']); // Assurez-vous que le chemin '/addpost' est correct
  }

}
