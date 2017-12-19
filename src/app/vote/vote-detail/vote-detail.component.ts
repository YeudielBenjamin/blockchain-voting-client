import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VoteService } from "../vote.service";
import 'rxjs/add/operator/switchMap';
import { Election } from '../../shared/models/election';
import { Candidate } from '../../shared/models/candidate';
import { Vote } from "../../shared/models/vote";
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.css']
})
export class VoteDetailComponent implements OnInit {

  election; // Election
  url = environment.baseUrl + "election-image/";
  urlCandidate = environment.baseUrl + "candidate-image/";
  selectVote: boolean = false;
  selectedCandidate; // Candidate

  constructor(
    private _voteService: VoteService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    let election$ = this._route.paramMap.switchMap(
      (params: ParamMap) => this._voteService.getElection(params.get("id"))
    );

    election$.subscribe(
      response => {
        this.election = response.data.election;
      },
      error => {
        console.error(error);
      }
    )
  }

  selectCandidate(candidate: Candidate){
    this.selectedCandidate = candidate;
    this.selectVote = true;
  }

  vote(){
    this.selectVote = false;
    if (localStorage){
      let keysString = localStorage.getItem("keys");
      if (keysString){
        let keys = JSON.parse(keysString);
        let publicKey = keys.publicKey;
        let privateKey = keys.privateKey;
        let vote = new Vote(
          this.election.id,
          this.election.title,
          this.selectedCandidate.name,
          this.selectedCandidate.id
        );
        this._voteService.vote(vote, publicKey, privateKey).subscribe(console.log);
      }
    }
  }
}
