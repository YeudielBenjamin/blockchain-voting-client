import { Component, OnInit } from '@angular/core';

import { ElectionService } from "./election.service";
import { CandidateService } from "../candidate/candidate.service";
import { Election } from "../shared/models/election";
import { Candidate } from "../shared/models/candidate";
import { MyResponse } from "../shared/models/response";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {

  election: Election;
  titleEl: string;
  descriptionEl: string;
  optionsEl: string;
  filesToUpload: File[];
  candidates: Candidate[];
  selectedCandidates: string[] = [];
  url: string = environment.baseUrl + "candidate-image/";
  success: boolean = false;
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
    private _electionService: ElectionService,
    private _candidateService: CandidateService
  ) { }

  ngOnInit() {
    this._candidateService.getCandidates().subscribe(
      response => {
        this.candidates = response.data.candidates;
      },
      error => {
        console.error(error);
      }
    );
  }

  checkedCandidate(e){
    let element = e.target;
    if (element.checked){
      this.selectedCandidates.push(element.id);
    } else{
      if (this.selectedCandidates.includes(element.id)){
        this.selectedCandidates = this.selectedCandidates.filter(d => {if (d != element.id) return d});
      }
    }
  }

  createElection(){
    let options = this.optionsEl.split(",");
    options = options.map(result => result.trim());
    this.election = new Election(this.titleEl, this.descriptionEl, options, "", this.selectedCandidates);
    if (this.filesToUpload && this.filesToUpload.length > 0){
      this._electionService.uploadImage(this.filesToUpload).then(
        (response : MyResponse) => {
          this.election.setImage(response.data.filename);
          this.saveElection();
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
      )
    }
    else{
      this.saveElection();
    }
  }

  saveElection(){
    console.log(this.election);
    this._electionService.saveElection(this.election).subscribe(
      response => {
        console.log(response);
        this.alertClass= "alert-success";
        this.shape = this.shapes[this.alertClass];
        this.alert_text = response.msg;
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }, error=> {
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

  fileChangeEvent(event){
    this.filesToUpload = event.target.files;
  }

}
