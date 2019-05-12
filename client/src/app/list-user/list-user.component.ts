import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { User } from "../model/user.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  email:any
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    let a= JSON.parse(localStorage.getItem('currentUser'));
    this.email= a.email
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  deleteUser(user: User): void {
    let val = user._id;
    this.userService.deleteUser(val)
      .subscribe(data => {
        alert(data.message);
        this.router.navigate(['list-user']);
      },
      error => {
        if (error.status == 304) {
          alert(" You Can Delete  only Your Users ");
          this.router.navigate(['add-user']);
        }
      }
      )
  };

  editUser(user: User): void {
    let id = user._id;
    this.router.navigate(['edit-user', { id }]);
    
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
