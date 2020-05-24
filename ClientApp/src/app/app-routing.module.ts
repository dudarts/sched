import { EventUpdateComponent } from './components/event/event-update/event-update.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { EventComponent } from './components/event/event.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { EvenCreateComponent } from './components/event/even-create/even-create.component';

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
        path: "user/update/:id", component: UserUpdateComponent
      },
      {
        path: "event", component: EventComponent
      },
      {
        path: "event/create", component: EvenCreateComponent
      },
      {
        path: "event/update/:id", component: EventUpdateComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
