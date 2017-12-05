import { Component, OnInit } from '@angular/core';
import { Candidate } from "../shared/models/candidate";
import { CandidateService } from "./candidate.service";
import { MyResponse } from "../shared/models/response";

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

  candidate: Candidate;
  nameCan: string;
  bioCan: string;
  filesToUpload: File[];

  constructor(
    private _candidateService: CandidateService
  ) { }

  ngOnInit() {
  }

  createCandidate(){
    this.candidate = new Candidate(this.nameCan, this.bioCan, "");
    if (this.filesToUpload.length > 0){
      this._candidateService.uploadImage(this.filesToUpload).then(
        (response : MyResponse) => {
          this.candidate.setImage(response.data.filename);
          this.saveCandidate();
        },
        error => {
          console.error(error);
        }
      )
    }
    else{
      this.saveCandidate();
    }
  }

  saveCandidate(){
    this._candidateService.saveCandidate(this.candidate).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }

  fileChangeEvent(event){
    this.filesToUpload = event.target.files;
  }

}
