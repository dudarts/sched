import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { EventComponent } from './components/event/event.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';

const routes: Routes = [
  {
    path: "", redirectTo: 'login', pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "home", component: HomeComponent,
    children: [
      {
        path: "user", component: UserComponent
      },
      {
        path: "user/create", component: UserCreateComponent
      },
      {
        path: "event", component: EventComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
