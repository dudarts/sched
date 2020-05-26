import { UserEvent } from './../event/userEvent.model';
import { Events } from './../event/event.model';
import { EventsService } from './../event/event.service';
import { User } from './../user/user.model';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-events',
  templateUrl: './users-events.component.html',
  styleUrls: ['./users-events.component.css']
})
export class UsersEventsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'name', 'email'];
  dataSource = new MatTableDataSource<User>();;
  selection = new SelectionModel<User>(true, []);
  users: User[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  event: Events
  userEvent: UserEvent
  idEvent: any

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private eventService: EventsService
  ) { }

  applyFilter(event: Event) {
    const filterValueExclusive = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValueExclusive.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.idEvent = this.route.snapshot.paramMap.get('id')
    this.eventService.getById(this.idEvent).subscribe(
      (e) => {
        if (e == null) {
          this.eventService.showMessage("Evento não identificado")
          this.router.navigate(["/home/event"])
          this.event = e
        }
      })

    this.userService.getAll().subscribe((users) => {
      this.users = users
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.sort = this.sort
    }
    );
  }


  getNameEvent() {
    console.log(this.event)
  }

  saveSelecion() {
    //console.log(this.selection)
    //console.log(this.selection['_selected']['length'])
    if (this.selection['_selected']['length'] == 0) {
      this.userService.showMessage("Selecione alguém")
    } else {
      this.selection['_selected'].forEach(element => {
        this.userService.showMessage(element.id)
        this.userEvent.userId = element.id
        this.userEvent.eventId = this.idEvent

        this.eventService.saveUserInEvent(this.userEvent).subscribe(
          () => {
            
          })
      });
      this.userService.showMessage("Pessoas adicionadas com sucesso")
      this.router.navigate(['/home/events'])
    }


  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
