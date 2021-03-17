import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(private auth : AuthService, private token : TokenStorageService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.login(this.signinForm.value).subscribe(res => {
      this.token.saveToken(res.accessToken);
      this.token.saveUser(res.username);

      const {redirect} = window.history.state;
      this.router.navigateByUrl(redirect || '/'); 
    },
    err => {
      console.log(err);
    });
  }

}
