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
      // name: new FormControl(''),
      // email: new FormControl(''),
      // password: new FormControl('', [Validators.required]),
      // birthDate: new FormControl(''),
      // gender: new FormControl('')

      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  submit() {  
    if (this.formUser.valid) {
      // console.log(this.formUser.value)
      this.userService.showMessage("Chegou aqui")
      // const email = this.formUser.value.email
      // const password = this.formUser.value.password
      // const name = this.formUser.value.name
      // const birthDate = this.formUser.value.birthDate
      // const gender = this.formUser.value.gender

      // this.user.name = name;
      // this.user.email = email;
      // this.user.password = password;
      // this.user.birthDate = birthDate;
      // this.user.gender = gender;

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
