import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    console.log('service started')
    this.verifyLogin()
  }

  login(email: string, password: string) {
    this._http.post<any>(`http://localhost:5000/api/auth`, { email, password })
      .toPromise()
      .then(data => {
        this.setToken(data.token)
        this.router.navigate(['home'])
      })
      .catch((e: HttpErrorResponse) => this.showMessage(e.message))
  }

  getToken = () => localStorage.getItem('user')

  clearToken = () => localStorage.removeItem('user')

  setToken(token: string) {
    localStorage.setItem('user', token)
  }

  /// retorna true se o token for válido
  tokenIsValid() {
    const token = this.getToken()

    if (token === undefined) return false
    const helper = new JwtHelperService()

    let isExpired = true
    try {
      isExpired = helper.isTokenExpired(token)
    } catch (error) {
      isExpired = true
    }

    return !isExpired
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'x', {
      duration: 10000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  verifyLogin() {
    if (!this.tokenIsValid()) this.router.navigate(['login'])
  }

  getName() {
    if (!this.tokenIsValid()) return ''
    
    let jwt = this.getToken()

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)// btoa base64
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    let name = decodedJwtData.name
    return name
    
  }

  getId() {
    if (!this.tokenIsValid()) return ''
    
    let jwt = this.getToken()

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)// btoa base64
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    let id = decodedJwtData.subject
    return id
    
  }

  logout(){
    this.clearToken();
    this.router.navigate(["login"]);
  }
  

}
