import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from '../event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserEvent } from '../userEvent.model';
import { Router } from '@angular/router';
import { EventsService } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-event-shared',
  templateUrl: './event-shared.component.html',
  styleUrls: ['./event-shared.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventSharedComponent implements OnInit {

  eventsShared: Events[];
  displayedColumnsShared: string[] = ['name', 'date', 'action'];
  dataSourceExclusive = new MatTableDataSource();
  dataSourceShared = new MatTableDataSource();
  expandedElement: Events | null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  arrow: Events | null;
  usersEvent: UserEvent;
  idLogin

  constructor(private router: Router,
    private eventService: EventsService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  applyFilteShared(event: Event) {
    const filterValueShared = (event.target as HTMLInputElement).value;
    this.dataSourceShared.filter = filterValueShared.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.idLogin = this.auth.getId();

    this.eventService.getByTypeForUser(this.idLogin, 2).subscribe(eventsShared => {
      this.eventsShared = eventsShared
      this.dataSourceShared = new MatTableDataSource(this.eventsShared);
      this.dataSourceShared.sort = this.sort;
    }
    ),
      (error: any) => {
        this.eventService.showMessage("Deu zica de novo");
        console.error('Observer got an error: ' + error);
      }
      this.idLogin = this.auth.getId();
  }

  toEventCreate(): void {
    this.router.navigate(['/home/event/create'])
  }


  getUserInEvent(userId: any, eventId: any) : UserEvent {
    this.eventService.getUserEvent(userId, eventId).subscribe(
      (userEvent) => {
        this.usersEvent = userEvent        
      })

      return this.usersEvent
  }

  private getIdLogin(){
    return this.auth.getId();
  }

  private getNameLogin(){
    return this.auth.getName;
  }

  confirmDelete(id: any) {
    const dialogRef = this.dialog.open(EventSharedDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventService.delete(id).subscribe(
          () => {
            this.eventService.showMessage("Evento excluído com sucesso")
            this.ngOnInit()
          },
          (error: any) => {
            this.eventService.showMessage("Deu zica");
            console.error('Erro: ' + error);
          }
        )
      } else {
        this.eventService.showMessage("Ação cancelada")
      }
    });
  }

}


@Component({
  selector: 'event-shared-dialog-delete',
  templateUrl: 'event-shared-dialog-delete.html',
  styleUrls: ['./event-shared.component.css']
})

export class EventSharedDialog { }