import { AuthService } from './../../auth/auth.service';
import { UserEvent } from './userEvent.model';
import { EventsService } from './event.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Events } from './event.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventsExclusive: Events[];
  eventsShared: Events[];
  // displayedColumns: string[] = ['id', 'name', 'description', 'date', 'local', 'type'];
  displayedColumnsExclusive: string[] = ['name', 'date', 'action'];
  displayedColumnsShared: string[] = ['name', 'date', 'action'];
  dataSourceExclusive = new MatTableDataSource();
  dataSourceShared = new MatTableDataSource();
  expandedElement: Events | null;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  arrow: Events | null;
  usersEvent: UserEvent;
  idLogin: any;

  constructor(private router: Router,
    private eventService: EventsService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  
  ngOnInit(): void {
    
  }

  toEventCreate(): void {
    this.router.navigate(['/home/event/create'])
  }
}