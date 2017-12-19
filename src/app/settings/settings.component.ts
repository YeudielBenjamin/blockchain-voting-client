import { Component, OnInit } from '@angular/core';
import { SettingsService } from "./settings.service";
import { LoginService } from "../login/login.service";
import { User } from '../shared/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  publicKey: string;
  privateKey: string;
  user: User;

  constructor(
    private _settingsService: SettingsService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    if (localStorage){
      let data = localStorage.getItem("keys");
      let user = localStorage.getItem("user");
      if (user){
        this.user = JSON.parse(user);
      }
      if (data){
        let keys = JSON.parse(data);
        this.publicKey = keys.publicKey;
        this.privateKey = keys.privateKey;
      }
      else {
        this._settingsService.getKeys().subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.error(error);
          }
        );
      }
    }
  }

}
