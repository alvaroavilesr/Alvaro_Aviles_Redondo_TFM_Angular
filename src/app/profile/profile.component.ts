import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userData: any;

  ngOnInit(): void {
    this.userData = {
      username: sessionStorage.getItem('UserName'),
      email: sessionStorage.getItem('UserEmail'),
      name: sessionStorage.getItem('FirstName'),
      surname: sessionStorage.getItem('LastName')
    };
  }

  showAlert(): void {
    alert('Button clicked!');
  }
}
