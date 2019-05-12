import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component"
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import { from } from 'rxjs';
import {AuthGuard} from "./service/auth.guard"

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent ,canActivate:[AuthGuard]},
  { path: 'list-user', component: ListUserComponent,canActivate:[AuthGuard] },
  { path: 'edit-user', component: EditUserComponent,canActivate:[AuthGuard] },
  {path : '', component : RegisterComponent}
];

export const routing = RouterModule.forRoot(routes);
