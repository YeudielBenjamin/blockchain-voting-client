import { Component, OnInit } from '@angular/core';
import { SettingsService } from "./settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  publicKey: string;
  privateKey: string;

  constructor(
    private _settingsService: SettingsService
  ) { }

  ngOnInit() {
    if (localStorage){
      let data = localStorage.getItem("keys");
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
