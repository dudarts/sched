import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    name: "Dalila",
    email: "lila@msn.com",
    password: "123",
    birthDate: new Date("2017-03-30"),
    gender: "M"
  }

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createUser(): void {
    this.userService.create(this.user).subscribe(
      () => {
        this.userService.showMessage("Usuário cadastrado com sucesso")
        this.router.navigate(['/user'])
      },
      (error: any) => {
        this.userService.showMessage("Deu zica");
        console.error('Observer got an error: ' + error);
      }
      )
  }

  cancel(): void {
    this.router.navigate(['/user']);
  }


}
