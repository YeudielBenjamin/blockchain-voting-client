import { Component, OnInit } from '@angular/core';
import { SettingsService } from "./settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _settingsService: SettingsService
  ) { }

  ngOnInit() {
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
