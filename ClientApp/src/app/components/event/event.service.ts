import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

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

  create(event: Events): Observable<Events> {
    return this.http.post<Events>("http://localhost:5000/api/event", event);
  }

  getAll(): Observable<Events[]>{
    return this.http.get<Events[]>("http://localhost:5000/api/event");
  }
  
  getById(id : string): Observable<Events>{
    return this.http.get<Events>(`http://localhost:5000/api/event/${id}`);
  }

  getByType(id : string): Observable<Events[]>{
    return this.http.get<Events[]>(`http://localhost:5000/api/event/eventtype/${id}`);
  }

  update(event : Events): Observable<Events>{
    return this.http.put<Events>(`http://localhost:5000/api/event`, event);
  }

  delete(id : string): Observable<Events>{
    return this.http.delete<Events>(`http://localhost:5000/api/event/${id}`);
  }

}
