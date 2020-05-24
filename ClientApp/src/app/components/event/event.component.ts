import { EventsService } from './event.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from './event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EventComponent implements OnInit {

  eventsExclusive: Events[];
  eventsShared: Events[];
  // displayedColumns: string[] = ['id', 'name', 'description', 'date', 'local', 'type'];
  displayedColumns: string[] = ['name', 'date', 'action'];
  dataSourceExclusive = new MatTableDataSource();
  dataSourceShared = new MatTableDataSource();
  expandedElement: Events | null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  arrow: Events | null;

  constructor(private router: Router,
    private eventService: EventsService,
    private dialog: MatDialog
  ) { }

  applyFilterExclusive(event: Event) {
    const filterValueExclusive = (event.target as HTMLInputElement).value;
    this.dataSourceExclusive.filter = filterValueExclusive.trim().toLowerCase();
  }

  applyFilteShared(event: Event) {
    const filterValueShared = (event.target as HTMLInputElement).value;
    this.dataSourceShared.filter = filterValueShared.trim().toLowerCase();
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


      this.eventService.getByType("2").subscribe(eventsShared => {
        this.eventsShared = eventsShared
        this.dataSourceShared = new MatTableDataSource(this.eventsShared);
        this.dataSourceShared.sort = this.sort;
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

  confirmDelete(id: any) {
    const dialogRef = this.dialog.open(EventDialog);

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
  selector: 'event-dialog-delete',
  templateUrl: 'event-dialog-delete.html',
  styleUrls: ['./event.component.css']
})

export class EventDialog { }