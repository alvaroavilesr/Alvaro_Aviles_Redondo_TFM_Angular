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
}
