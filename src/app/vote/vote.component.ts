import { Component, OnInit } from '@angular/core';
import { VoteService } from "./vote.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  elections = [];
  url = environment.baseUrl + "election-image/";

  constructor(
    private _voteService: VoteService
  ) { }

  ngOnInit() {
    this._voteService.getElections().subscribe(
      response=> {
        this.elections = response.data.elections;
        console.log(this.elections);
        
      },
      error => {
        console.error(error);
      }
    );
    
  }

}
