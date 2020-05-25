import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from './event.model';
import { UserEvent } from './userEvent.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


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

  create(event: Events): Observable<Events> {
    return this.http.post<Events>("http://localhost:5000/api/event", event);
  }

  getAll(): Observable<Events[]> {
    return this.http.get<Events[]>("http://localhost:5000/api/event");
  }

  getById(id: string): Observable<Events> {
    return this.http.get<Events>(`http://localhost:5000/api/event/${id}`);
  }

  getByDateAndType(ano: string, mes: string, dia: string, typeId: string): Observable<Events> {
    return this.http.get<Events>(`http://localhost:5000/api/event/${ano}/${mes}/${dia}/${typeId}`);
  }

  getByTypeForUser(userId: any, eventId: any): Observable<Events[]> {
    return this.http.get<Events[]>(`http://localhost:5000/api/event/eventTypeId/${eventId}/userId/${userId}`);
  }

  update(event: Events): Observable<Events> {
    return this.http.put<Events>(`http://localhost:5000/api/event`, event);
  }

  delete(id: string): Observable<Events> {
    return this.http.delete<Events>(`http://localhost:5000/api/event/${id}`);
  }
  
  getByDateNow(op: any): Observable<Events[]> {
    return this.http.get<Events[]>(`http://localhost:5000/api/event/now/${op}`);
  }






  // métodos esclusivos para a tabela UserEvent.
  getUserEvent(userId: any, eventId: any): Observable<UserEvent> {
    return this.http.get<UserEvent>(`http://localhost:5000/api/UsersEvents/userId/${userId}/eventId/${eventId}`);
  }

  saveUserInEvent(userEvent: UserEvent) {
    return this.http.post<UserEvent>("http://localhost:5000/api/UsersEvents", userEvent);
  }

  deleteUserEvent(userId: any, eventId: any): Observable<UserEvent> {
    return this.http.delete<UserEvent>(`http://localhost:5000/api/UsersEvents/userId/${userId}/eventId/${eventId}`);
  }

}
