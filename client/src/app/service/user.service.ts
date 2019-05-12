import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {User} from "../model/user.model";
import { Observable,of  } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { 
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
  });
  let options = {headers:headers};

  }
  
  baseUrl: string = 'http://localhost:5000/v1/user';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    let a= JSON.parse(localStorage.getItem('currentUser'));
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + a.token)
    return this.http.post(this.baseUrl, user,{headers:headers_object});
  }

  updateUser(user: User) {
    let a= JSON.parse(localStorage.getItem('currentUser'));
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + a.token)
    return this.http.patch(this.baseUrl + '/' + user._id, user,{headers:headers_object});
  }

  deleteUser(id: string) {
    let a= JSON.parse(localStorage.getItem('currentUser'));
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + a.token)
    return this.http.delete<any>(this.baseUrl + '/' + id,{headers:headers_object});
  }
}
