import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:3000/api/auth';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private tokenStorage : TokenStorageService, private router : Router) { }

  login(credentials : any ) : Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      username : credentials.username,
      password : credentials.password
    }, httpOptions);
  }

  signup(user : any) : Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      username : user.username,
      email : user.email,
      password : user.password,
    }, httpOptions);
  }

  isLoggedIn(){
    let token = this.tokenStorage.getToken();
    if(token == null || token == undefined){
      return false;
    }

    let decoded : JwtPayload = jwtDecode<JwtPayload>(token);
    if(decoded.exp){
      if(decoded.exp < Date.now() / 1000){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }

  logOut(){
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/salut'); 
  }
}
