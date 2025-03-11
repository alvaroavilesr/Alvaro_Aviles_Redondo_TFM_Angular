import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Login} from '../models/login.model';
import {EndPoints} from '../end-points';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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

}
