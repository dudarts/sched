import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Events } from '../event.model';
import { UserEvent } from '../userEvent.model';
import { EventsService } from '../event.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-event-exclusive',
  templateUrl: './event-exclusive.component.html',
  styleUrls: ['./event-exclusive.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventExclusiveComponent implements OnInit {

  eventsExclusive: Events[];
  // displayedColumns: string[] = ['id', 'name', 'description', 'date', 'local', 'type'];
  displayedColumnsExclusive: string[] = ['name', 'date', 'action'];
  dataSourceExclusive = new MatTableDataSource();
  expandedElement: Events | null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  arrow: Events | null;
  usersEvent: UserEvent;
  idLogin;
  slideIGo = false;

  constructor(private router: Router,
    private eventService: EventsService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  applyFilterExclusive(event: Event) {
    const filterValueExclusive = (event.target as HTMLInputElement).value;
    this.dataSourceExclusive.filter = filterValueExclusive.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.eventService.getByType("1").subscribe(eventsExclusive => {
      this.eventsExclusive = eventsExclusive
      this.dataSourceExclusive = new MatTableDataSource(this.eventsExclusive);
      this.dataSourceExclusive.sort = this.sort;
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


  getUserInEvent(userId: any, eventId: any): UserEvent {
    this.eventService.getUserEvent(userId, eventId).subscribe(
      (userEvent) => {
        this.usersEvent = userEvent
      })

    return this.usersEvent
  }

  private getIdLogin() {
    return this.auth.getId();
  }

  private getNameLogin() {
    return this.auth.getName;
  }

  confirmDelete(id: any) {
    const dialogRef = this.dialog.open(EventExclusiveDialog);

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

  confirmIGo(id: any) {
    const dialogRef = this.dialog.open(EventExclusiveDialogIGo);

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.slideIGo) {
        this.eventService.getUserEvent(this.idLogin, id).subscribe(
          (e) => {
            this.usersEvent = e;
            //this.eventService.showMessage("01")
            if (this.usersEvent == null) {
              this.usersEvent = { userId: +this.idLogin, eventId: +id }
              //this.usersEvent.eventId = +id;
              //this.usersEvent.userId = +this.idLogin;
              //this.eventService.showMessage("02")
              console.log(this.usersEvent)
              this.eventService.saveUserInEvent(this.usersEvent).subscribe(
                () => {
                  //console.log(this.usersEvent)
                  this.eventService.showMessage("Adicionado ao Evento")
                  this.router.navigate(['/home/event'])
                }
              )
            }
          }
        )

        // this.eventService.delete(id).subscribe(
        // () => {
        //this.eventService.showMessage(`Eu vou sim. ID: ${id}`)
        // this.ngOnInit()
        //   },
        //   (error: any) => {
        //     this.eventService.showMessage("Deu zica");
        //     console.error('Erro: ' + error);
        //   }
        // )
      } else {
        this.slideIGo = false;
        this.eventService.showMessage("\"Num\" vai não!")
      }
    });
  }



}

@Component({
  selector: 'event-exclusive-dialog-delete',
  templateUrl: 'event-exclusive-dialog-delete.html',
  styleUrls: ['./event-exclusive.component.css']
})

export class EventExclusiveDialog { }


@Component({
  selector: 'event-exclusive-dialog-IGo',
  templateUrl: 'event-exclusive-dialog-IGo.html',
  styleUrls: ['./event-exclusive.component.css']
})

export class EventExclusiveDialogIGo { }