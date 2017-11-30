import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: string;
  public pass: string;

  constructor() { }

  ngOnInit() {
  }

  registerNewUser(){
    console.log(this.user);
    console.log(this.pass);
    
  }

}
