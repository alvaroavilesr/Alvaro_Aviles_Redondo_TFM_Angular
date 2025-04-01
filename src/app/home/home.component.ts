import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('UserEmail');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('FirstName');
    sessionStorage.removeItem('LastName');
  }

}
