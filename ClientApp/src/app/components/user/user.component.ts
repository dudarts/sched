import { User } from './user.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'action'];
  dataSource = new MatTableDataSource();


  constructor(private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }


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
    }
    ),
      (error: any) => {
        this.userService.showMessage("Deu zica de novo");
        console.error('Observer got an error: ' + error);
      }
    this.refresh();
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

  refresh() {
    this.changeDetectorRefs.detectChanges();
  }

}

@Component({
  selector: 'user-dialog-delete',
  templateUrl: 'user-dialog-delete.html',
  styleUrls: ['./user.component.css']
})

export class UserDialog { }
