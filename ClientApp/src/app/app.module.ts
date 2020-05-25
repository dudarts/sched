import { EventSharedComponent, EventSharedDialog } from './components/event/event-shared/event-shared.component';
import { EventExclusiveComponent, EventExclusiveDialog, EventExclusiveDialogIGo } from './components/event/event-exclusive/event-exclusive.component';
import { EventUpdateComponent } from './components/event/event-update/event-update.component';
import { EventCreateComponent } from './components/event/event-create/event-create.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { EventComponent, EventDialog } from './components/event/event.component';
import { UserComponent, UserDialog } from './components/user/user.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    EventComponent,
    UserComponent,
    UserCreateComponent,
    LoginComponent,
    UserUpdateComponent,
    UserDialog,
    EventCreateComponent,
    EventUpdateComponent,
    EventExclusiveComponent,
    EventSharedComponent,
    EventDialog,
    EventExclusiveDialog,
    EventSharedDialog,
    EventExclusiveDialogIGo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    UserComponent,
    UserDialog,
    EventComponent,
    EventDialog,
    EventSharedComponent,
    EventExclusiveComponent,
    EventExclusiveDialog,
    EventSharedDialog,
    EventExclusiveDialogIGo
  ],
  providers: [[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]],
  bootstrap: [AppComponent]
})
export class AppModule { }
