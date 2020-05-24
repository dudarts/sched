import { environment } from './../../../environments/environment';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.urlbase;


  constructor(private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 10000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(user: User): Observable<User> {
    return this.http.post<User>("http://localhost:5000/api/users", user);
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>("http://localhost:5000/api/users");
  }
  
  getById(id : string): Observable<User>{
    return this.http.get<User>(`http://localhost:5000/api/users/${id}`);
  }

  update(user : User): Observable<User>{
    return this.http.put<User>(`http://localhost:5000/api/users`, user);
  }

  delete(id : string): Observable<User>{
    return this.http.delete<User>(`http://localhost:5000/api/users/${id}`);
  }
}
