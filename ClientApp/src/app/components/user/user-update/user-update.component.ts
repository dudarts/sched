import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getById(id).subscribe(
      user => {
        this.user = user
      });

    //console.log(this.user)

    this.formUser = new FormGroup({
      id: new FormControl(this.user.id, [Validators.required]),
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      //passwordConfirm: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  formUser: FormGroup
  floatLabelControl = new FormControl('auto');
  hide = true;
  user: User = {
    name: "",
    email: "",
    password: "",
    birthDate: new Date(""),
    gender: ""
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
    this.userService.update(this.user).subscribe(
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
