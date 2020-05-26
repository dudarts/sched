import { NgModule } from '@angular/core';
import { UsersEventsComponent } from './components/users-events/users-events.component';
import { EventUpdateComponent } from './components/event/event-update/event-update.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { EventComponent } from './components/event/event.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';

const routes: Routes = [
  {
    path: "", redirectTo: 'login', pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "home", redirectTo: 'home/event', pathMatch: 'full'
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
        path: "event/create", component: EventCreateComponent
      },
      {
        path: "event/update/:id", component: EventUpdateComponent
      },
      {
        path: "event/users/:id", component: UsersEventsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
