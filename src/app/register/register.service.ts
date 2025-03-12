import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../shared/services/api.service';
import {Register} from '../shared/models/register.model';

@Injectable({providedIn: 'root'})
export class RegisterService {

  constructor(private readonly apiService: ApiService) {}

  register(registerModel: Register): Observable<any> {
    return this.apiService.register(registerModel);
  }
}
