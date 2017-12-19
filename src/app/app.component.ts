import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { User } from "./shared/models/user";

import { LoginService } from "./login/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Blockchain voting interface';
  user = {};
  private subscription: Subscription;

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) { }

  ngOnInit(){
    this.subscription = this._loginService.userChanged$.subscribe(response => this.user = response);

    if (localStorage){
      let savedUser = localStorage.getItem("user");
      if (savedUser){
        console.log("Saved User:");
        console.log(savedUser);
        this._loginService.userChanged(JSON.parse(savedUser));
      }
    }
  }

  logout(){
    if(localStorage){
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
    }
    this._loginService.userChanged(null);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
