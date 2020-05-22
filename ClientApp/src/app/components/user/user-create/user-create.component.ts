import { User } from './../user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user: User = {
    name: "",
    email: "",
    password: "",
    birthDate: new Date(""),
    gender: ""
  }
  floatLabelControl = new FormControl('auto');
  hide = true;

  constructor(private userService: UserService,
    private router: Router) {
      
     }

  formUser: FormGroup

  ngOnInit(): void {
    this.formUser = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  

  submit() {  
    if (this.formUser.valid) {
      //this.userService.showMessage("Chegou aqui")
      this.createUser();
    } else {
      console.log('invalid')
    }
  }

  createUser(): void {
    this.userService.create(this.user).subscribe(
      () => {
        this.userService.showMessage("Usuário cadastrado com sucesso")
        this.router.navigate(['/home/user'])
      },
      (error: any) => {
        this.userService.showMessage("Deu zica");
        console.error('Observer got an error: ' + error);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/home/user']);
  }


}
