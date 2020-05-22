import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      console.log('imnterceptando')
    //define todos os requests com headers de appjson
    const headers = req.headers.set("Content-Type", "application/json");

    if (!this._auth.tokenIsValid()) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: headers.append(
        "Authorization",
        `Bearer ${this._auth.getToken()}`
      )
    });

    return next.handle(authReq);
  }
}