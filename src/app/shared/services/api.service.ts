import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../models/login.model';
import {EndPoints} from '../end-points';
import {Register} from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) { }

  login(loginModel : Login): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      userName: loginModel.username,
      userPassword: loginModel.password
    };

    return this.http.post(EndPoints.LOGIN, body, { headers, observe: 'response' });
  }

  register(registerModel: Register): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      userName: registerModel.username,
      userFirstName: registerModel.name,
      userLastName: registerModel.surname,
      email: registerModel.email,
      userPassword: registerModel.password
    };

    return this.http.post(EndPoints.REGISTER, body, { headers });
  }

  getUsers(): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(EndPoints.GET_USERS , { headers });
  }

  createUser(createUserModel: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      userName: createUserModel.username,
      userFirstName: createUserModel.firstname,
      userLastName: createUserModel.lastname,
      email: createUserModel.email,
      userPassword: createUserModel.password
    };

    return this.http.post(EndPoints.POST_USER + '/' + createUserModel.role, body, { headers });
  }
  updateUserData(field: string, newValue: string): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    switch (field) {
      case 'UserEmail':
        body = { email: newValue };
        break;
      case 'FirstName':
        body = { userFirstName: newValue };
        break;
      case 'LastName':
        body = { userLastName: newValue };
        break;
      case 'Password':
        body = { userPassword: newValue };
        break;
    }

    return this.http.put(EndPoints.UPDATE_USER + '/' + sessionStorage.getItem("UserName"), body, { headers });
  }

}
