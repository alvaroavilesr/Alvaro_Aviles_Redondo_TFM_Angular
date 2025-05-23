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

  updateUserDataProfile(field: string, newValue: string): Observable<any> {
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

  updateUserData(updateUserData: any): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    body = {
      userFirstName: updateUserData.userFirstName,
      userLastName: updateUserData.userLastName,
      email: updateUserData.email
    };

    return this.http.put(EndPoints.UPDATE_USER + '/' + updateUserData.userName, body, { headers });
  }

  updateUserPassword(user: any, newPass: string): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    body = {
      userPassword: newPass
    }

    return this.http.put(EndPoints.UPDATE_USER + '/' + user.userName, body, { headers });
  }

  updateUserRole(user: any, newRole: string): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put(EndPoints.UPDATE_USER + '/' + user.userName + '/' + newRole, body,  { headers });
  }

  deleteUser(user: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(EndPoints.DELETE_USER + '/' + user.userName,  { headers });
  }

  getCategories(): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(EndPoints.GET_CATEGORIES , { headers });
  }

  createCategory(createCategoryName: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      name: createCategoryName
    };

    return this.http.post(EndPoints.POST_CATEGORY , body, { headers });
  }

  updateCategory(createCategoryName: any, id: any): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    body = {
      name: createCategoryName
    };

    return this.http.put(EndPoints.PUT_CATEGORY + '/' + id, body, { headers });
  }

  deleteCategory(id: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(EndPoints.DELETE_CATEGORY + '/' + id,  { headers });
  }

  getItems(): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(EndPoints.GET_ITEMS , { headers });
  }

  createItem(createItemModel: any, createItemCategory: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      name: createItemModel.itemName,
      description: createItemModel.itemDescription,
      longDescription: createItemModel.itemLongDescription,
      size: createItemModel.itemSize,
      price: createItemModel.itemPrice,
      image: createItemModel.itemImage
    };

    return this.http.post(EndPoints.POST_ITEM + "/" + createItemCategory , body, { headers });
  }

  deleteItem(id: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(EndPoints.DELETE_ITEM + '/' + id,  { headers });
  }

  updateItem(updatedItem: any): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    body = {
      name: updatedItem.name,
      description: updatedItem.description,
      longDescription: updatedItem.longDescription,
      size: updatedItem.size,
      price: updatedItem.price,
      image: updatedItem.image
    };

    return this.http.put(EndPoints.PUT_ITEM + '/' + updatedItem.itemId, body, { headers });
  }

  updateItemCategory(itemId: any, updatedCategory: any): Observable<any> {
    let body: any;
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(EndPoints.PUT_ITEM_CATEGORY + '/' + itemId + '/' + updatedCategory, body, { headers });
  }

  getOrders(): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(EndPoints.GET_ORDERS , { headers });
  }

  deleteOrder(id: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete(EndPoints.DELETE_ORDER + '/' + id,  { headers });
  }

  createOrder(orderModel: any): Observable<any> {
    const userName = sessionStorage.getItem('UserName');
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      date: orderModel.date,
      address: orderModel.address,
      itemIdsAndAmounts: orderModel.itemIdsAndAmounts
    };

    return this.http.post(EndPoints.CREATE_ORDER + "/" + userName , body, { headers });
  }

  getOrder(orderId: any): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(EndPoints.GET_ORDER + '/' + orderId , { headers });
  }

  getUserOrders(): Observable<any> {
    const token = sessionStorage.getItem('JWT');
    const userName = sessionStorage.getItem('UserName');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(EndPoints.GET_USER_ORDERS + '/' + userName , { headers });
  }
}
