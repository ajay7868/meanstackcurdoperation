import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../service/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  validEmail:boolean = false
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  onSubmit(formvalue) {
    this.submitted = true;
    if (this.signForm.invalid) {
      return;
    }
    this.authService.signup(formvalue.value).subscribe(res=>{
      if(res.message){
        alert(res.message)
      }else{
        alert("signup success");
        this.router.navigate(['login']);
        this.invalidLogin = true;
      }
    })
       
    // }else {
     
    // }
  }

  ngOnInit() {
    this.signForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
    onChange(newValue) {
      const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (validEmailRegEx.test(newValue)) {
          this.validEmail = true;
      }else {
        this.validEmail = false;
      }
  }

}
