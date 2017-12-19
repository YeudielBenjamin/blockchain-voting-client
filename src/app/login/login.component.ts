import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from "../shared/models/user";

import { LoginService } from "./login.service";
import { log } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public user: string;
  public password: string;
  public errors : boolean = false;
  public errorMsg: string;
  public changePass: boolean = false;
  public pass1: string;
  public pass2: string;
  private changePassAuth: string;

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this._loginService.login(this.user, this.password).subscribe(
      response => {
        //console.log(response);
        if (response.change_pass){
          console.log("Change your password");
          this.changePass = true;
          this.changePassAuth = response.token;
        }
        else {
          this._loginService.userChanged(response);
          this._router.navigateByUrl("/home");
        }
      },
      error => {
        this.errors = true;
        this.errorMsg = "Invalid user or credentials";
      }
    );
  }

  changePassword(){
    console.log(this.pass1);
    console.log(this.pass2);
    console.log("Changing password >:v");
    
    if (this.pass1 === this.pass2){
      this._loginService.changePassword(this.pass1, this.changePassAuth).subscribe(
        response => {
          this.changePass = false;
          console.log(response);
        },
        error => {
          this.errors = true;
          this.errorMsg = error.msg;
        }
      );
    }
    else {
      this.errors = true;
      this.errorMsg = "Las contraseñas no coinciden";
    }
  }

}
