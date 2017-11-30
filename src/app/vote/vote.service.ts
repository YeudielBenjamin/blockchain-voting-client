import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map";

import { environment } from "../../environments/environment";

@Injectable()
export class VoteService{
    public url: string;

    constructor(private _http: Http){
        this.url = environment.baseUrl;
    }

    public vote(vote, publicKey, privateKey){
        let params = JSON.stringify({vote, publicKey, privateKey});
        let headers = new Headers({"Content-Type": "application/json"});
        if (localStorage){
            let hash = localStorage.getItem("auth");
            headers.append("Authorization", hash);
        }
        
        return this._http
                    .post(this.url+ "transaction", params, {headers})
                    .map(response => response.json())
                    .catch(this.catchError);
    }

    private catchError(error: Response | any){
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