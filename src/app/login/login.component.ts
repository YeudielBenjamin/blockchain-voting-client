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

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this._loginService.login(this.user, this.password).subscribe(
      response => {
        this._loginService.userChanged(response);
        this._router.navigateByUrl("/home");
      },
      error => {
        this.errors = true;
      }
    );
  }

}
