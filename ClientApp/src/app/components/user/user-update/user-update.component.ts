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

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.userService.getById(id).subscribe(
      user => {
        user.password = ""
        this.user = user
      });

    this.formUser = new FormGroup({
      id: new FormControl({value: this.user.id, disabled: true}, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      //passwordConfirm: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    })
  }

  submit() {
    if (this.formUser.valid) {
      //this.userService.showMessage("Chegou aqui")
      this.updateUser();
    } else {
      console.log('invalid')
    }
  }

  updateUser(): void {
    this.userService.update(this.user).subscribe(
      () => {
        this.userService.showMessage("Usuário atualizado com sucesso")
        this.router.navigate(['/home/user'])
      },
      (error: any) => {
        this.userService.showMessage("Deu zica");
        console.error('Erro: ' + error);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/home/user']);
  }
}
