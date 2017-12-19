import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { Candidate } from "../shared/models/candidate";

import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map";

import { environment } from "../../environments/environment";

@Injectable()
export class CandidateService{
    public url: string;

    constructor(private _http: Http){
        this.url = environment.baseUrl;
    }

    public saveCandidate(candidate: Candidate){
        let params = JSON.stringify(candidate);
        let headers = new Headers({"Content-Type": "application/json"});
        if (localStorage){
            let hash = localStorage.getItem("auth");
            headers.append("Authorization", hash);
        }
        
        return this._http
                    .post(this.url+ "candidate", params, {headers})
                    .map(response => response.json())
                    .catch(this.catchError);
    }

    public getCandidates(){
        let headers;
        if (localStorage){
            let hash = localStorage.getItem("auth");
            headers = new Headers({"Authorization": hash});
        }

        return this._http
                    .get(this.url + "candidate/", {headers})
                    .map(response => response.json())
                    .catch(this.catchError);
    }

    public uploadImage(files: Array<File>){      
        return new Promise((resolve, reject) => {
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append("image", files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            let hash = localStorage.getItem("auth");
            xhr.open("POST", this.url + "candidate-image", true);
            xhr.setRequestHeader("Authorization", hash);
            xhr.send(formData);
        });
    }

    private catchError(error: Response | any){
        console.log(error);
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
}
}