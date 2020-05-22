import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  getNameLogin(){
    return this.auth.getName()
  }

  getIdLogin(){
    return this.auth.getId()
  }

  logout(){
    this.auth.logout()
  }

}
