import { Component, OnInit } from '@angular/core';
import { VoteService } from "./vote.service";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(
    private _voteService: VoteService
  ) { }

  ngOnInit() {
    if (localStorage){
      let keys = JSON.parse(localStorage.getItem("keys"));
      let publicKey = keys.publicKey;
      let privateKey = keys.privateKey;
      this._voteService.vote("AMLO", publicKey, privateKey).subscribe(console.log);
    }
    
  }

}
