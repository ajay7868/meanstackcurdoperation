import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
   
  }
  baseUrl: string = 'http://localhost:5000/v1/user';
  login(username: string, password: string) {
        return this.http.post<any>(`${this.baseUrl}/login`, {username: username, password: password})
      .pipe(map(user => {
      console.log(user)
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  
  signup(value){
    return this.http.post<any>(`${this.baseUrl}/signup`, value);
  }
}
