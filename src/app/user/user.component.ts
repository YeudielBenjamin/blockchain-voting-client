import { Component, OnInit } from '@angular/core';
import { UserService } from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: string;
  public pass: string;
  public success: boolean = false;
  alertClass: string;
  shapes = {
    "alert-danger": "exclamation-circle",
    "alert-warning": "exclamation-triangle",
    "alert-info": "info-circle",
    "alert-success": "check-circle"
  };

  shape: string;
  alert_text: string;

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  registerNewUser(){
    this._userService.createUser(this.user, this.pass).subscribe(
      response => {
        console.log(response);
        this.alertClass= "alert-success";
        this.shape = this.shapes[this.alertClass];
        this.alert_text = response.msg;
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      },
      error => {
        console.error(error);
        this.alertClass= "alert-danger";
        this.shape = this.shapes[this.alertClass];
        this.alert_text = error.responseJSON.msg;
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }
    );
    
  }

}
