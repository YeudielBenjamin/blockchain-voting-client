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
  success: boolean = false;
  alertClass: string;
  /*{
    "alert-danger": false,
    "alert-warning": false,
    "alert-info": false,
    "alert-success": false
  };*/
  shapes = {
    "alert-danger": "exclamation-circle",
    "alert-warning": "exclamation-triangle",
    "alert-info": "info-circle",
    "alert-success": "check-circle"
  };

  shape: string;
  alert_text: string;

  constructor(
    private _candidateService: CandidateService
  ) { }

  ngOnInit() {
  }

  createCandidate(){
    this.candidate = new Candidate(this.nameCan, this.bioCan, "");
    if (this.filesToUpload && this.filesToUpload.length > 0){
      this._candidateService.uploadImage(this.filesToUpload).then(
        (response : MyResponse) => {
          this.candidate.setImage(response.data.filename);
          this.saveCandidate();
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
      this.saveCandidate();
    }
  }

  saveCandidate(){
    this._candidateService.saveCandidate(this.candidate).subscribe(
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

  fileChangeEvent(event){
    this.filesToUpload = event.target.files;
  }

}
