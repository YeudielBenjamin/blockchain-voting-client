import { Injectable } from "@angular/core";
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { User } from "../shared/models/user";

import 'rxjs/add/operator/catch';
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import 'rxjs/add/observable/of';

import { environment } from "../../environments/environment";

@Injectable()
export class SettingsService{
    public url: string;

    constructor(private _http: Http){
        this.url = environment.baseUrl;
    }

    public getKeys(){
        let params = JSON.stringify({});
        let headers = new Headers({"Content-Type": "application/json"});
        if (localStorage){
            let hash = localStorage.getItem("auth");
            headers.append("Authorization", hash);
        }
        
        return this._http
                    .post(this.url+ "keypair", params, {headers})
                    .map(this.proccessResponse)
                    .catch(this.catchError);
    }

    private proccessResponse(response){
        let res = response.json();
        if (localStorage){
            localStorage.setItem("keys", JSON.stringify(res.data.keys));
        }
        return res;
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