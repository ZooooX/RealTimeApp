import { HttpHandler, HttpInterceptor, HttpRequest , HTTP_INTERCEPTORS, HttpEvent} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'authozi';

//Intercepts http requests to add the jwt token to the request headers
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private token : TokenStorageService) {}

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();

        if(token != null){
            authReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.token.getToken()}`
                }
              });
        }

        return next.handle(authReq);
    }
}