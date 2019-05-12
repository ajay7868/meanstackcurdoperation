import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../model/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  value: any
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.value = { id: this.route.snapshot.params['id'] };
    console.log(this.route.snapshot.params['id'])
    this.editForm = this.formBuilder.group({
      _id: [],
      signuser: [],
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['']
    });
    this.userService.getUserById(this.value.id)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .subscribe(data => {
        this.router.navigate(['list-user']);
      },
        error => {
          if (error.status == 304) {
            alert(" You Can Edit only Your  added User ");
            this.router.navigate(['list-user']);
          }
        });
  }

}
