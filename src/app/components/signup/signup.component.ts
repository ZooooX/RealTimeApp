import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    username : new FormControl('',Validators.required),
    password : new FormControl('', Validators.required)
  });

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.auth.signup(this.signupForm.value).subscribe(res => {
      this.router.navigate(['/signin']);
    },
    err => {
      console.log(err);
    });
  }
}
