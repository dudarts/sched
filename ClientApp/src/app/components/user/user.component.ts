import { User } from './user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) { }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.users = users
      //console.log(this.users)
      //this.userService.showMessage("Listou tudo")
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    }
    ),
      (error: any) => {
        this.userService.showMessage("Deu zica de novo");
        console.error('Observer got an error: ' + error);
      }   
  }

  toUserCreate(): void {
    this.router.navigate(['/home/user/create'])
  }

  confirmDelete(id: any) {
    const dialogRef = this.dialog.open(UserDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(id).subscribe(
          () => {
            this.userService.showMessage("Usuário excluído com sucesso")
            this.ngOnInit()
          },
          (error: any) => {
            this.userService.showMessage("Deu zica");
            console.error('Erro: ' + error);
          }
        )
      } else {
        this.userService.showMessage("Ação cancelada")
      }
    });
  }


}

@Component({
  selector: 'user-dialog-delete',
  templateUrl: 'user-dialog-delete.html',
  styleUrls: ['./user.component.css']
})

export class UserDialog { }
