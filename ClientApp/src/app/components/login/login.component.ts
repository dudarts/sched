import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  hide = true;

  constructor(private _auth: AuthService, fb: FormBuilder) { 
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }
  
  myForm: FormGroup

  ngOnInit(): void {

    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])      
    })

  }

  submit(){
    if(this.myForm.valid){
      console.log(this.myForm.value)

      const email = this.myForm.value.email
      const password = this.myForm.value.password

      this._auth.login(email, password)
    }else{
      console.log('invalid')
    }
  }

}
