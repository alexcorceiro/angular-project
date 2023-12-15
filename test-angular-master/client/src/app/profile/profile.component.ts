import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import{Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = {};
  editing: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(userData => {
          this.user = userData;
          this.user.uid = user.uid; // Store the user ID if you need to reference it for updates.
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveProfile(newFirstName: string, newLastName: string, newEmail: string, newBirthdate: Date): void {
    // Assume that newFirstName, newLastName, newEmail, newBirthdate are being passed from the template via ngModel or formControls
    if (!this.user.uid) {
      console.error('User ID is undefined.');
      return;
    }

    this.firestore.collection('users').doc(this.user.uid).update({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      birthdate: newBirthdate // Make sure the date is in the correct format for Firestore
    }).then(() => {
      console.log('Profile updated successfully!');
      this.editing = false;
    }).catch(error => {
      console.error('Error updating profile:', error);
    });
  }

  tasklist(){
     this.router.navigate(['/todolist']);
  }
}
