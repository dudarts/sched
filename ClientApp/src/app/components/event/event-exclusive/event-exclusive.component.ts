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
  idLogin : any;
  slideIGo: boolean;
  isChecked: boolean;

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
    this.idLogin = this.auth.getId();

    this.eventService.getByTypeForUser(this.idLogin, 1).subscribe(eventsExclusive => {
      this.eventsExclusive = eventsExclusive
      this.dataSourceExclusive = new MatTableDataSource(this.eventsExclusive);
      this.dataSourceExclusive.sort = this.sort;
    }
    ),
      (error: any) => {
        this.eventService.showMessage("Deu zica de novo");
        console.error('Observer got an error: ' + error);
      }
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

  getIdLogin() {
    return this.idLogin;
  }

  private getNameLogin() {
    return this.auth.getName;
  }

  eventExpiration(date: Date) {
    const now = new Date();
    const DBdate = new Date(date);
    const result = (DBdate.getDate() == now.getDate() && DBdate.getMonth() == now.getMonth() && DBdate.getFullYear() == now.getFullYear())
    console.log(date + ": " + result)
    return result;
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

  confirmIGo(id: any, go: any) {
    //const dialogRef = this.dialog.open(EventExclusiveDialog);
    if (go.checked) {
      this.eventService.getUserEvent(this.idLogin, id).subscribe(
        (e) => {
          this.usersEvent = e;
          //console.log("Add: " + this.usersEvent)
          if (this.usersEvent == null) {
            this.usersEvent = {
              userId: +this.idLogin,
              eventId: +id
            }
            //console.log(this.usersEvent)
            this.eventService.saveUserInEvent(this.usersEvent).subscribe(
              () => {
                //console.log(this.usersEvent)
                this.eventService.showMessage("Adicionado ao Evento")
                //this.ngOnInit();
              }
            )
          }
        }
      )

      //this.eventService.showMessage("Eu vou")
    } else {
      this.eventService.deleteUserEvent(this.idLogin, id).subscribe(
        () => {
          //console.log(this.usersEvent)
          this.eventService.showMessage("\"Num\" vai não!!!")
          //this.ngOnInit();
        }
      )

    }
  }

  // confirmIExit(id: any) {
  //   const dialogRef = this.dialog.open(EventExclusiveDialogIGo);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.eventService.getUserEvent(this.idLogin, id).subscribe(
  //         (e) => {
  //           this.usersEvent = e;
  //           console.log("Exit: " + this.usersEvent)
  //           if (this.usersEvent != null) {

  //             this.eventService.deleteUserEvent(this.idLogin, id).subscribe(
  //               () => {
  //                 //console.log(this.usersEvent)
  //                 this.eventService.showMessage("Você saiu do evento ao Evento")
  //                 this.ngOnInit();
  //               }
  //             )
  //           }
  //         }
  //       )
  //     } else {   
  //       this.eventService.showMessage("\"Num\" vai não!")
  //     }
  //   });
  // }



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