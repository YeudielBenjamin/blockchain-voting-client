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
export class LoginService{
    public url: string;
    private subject = new Subject<User>();
    userChanged$ = this.subject.asObservable();

    constructor(private _http: Http){
        this.url = environment.baseUrl;
    }

    public userChanged(user: User){
        this.subject.next(user);
    }

    public login(username, password) : Observable<User>{
        let params = JSON.stringify({username, password});
        let headers = new Headers({"Content-Type": "application/json"});

        return this._http
                    .post(this.url+ "login", params, {headers})
                    .map(this.proccessResponse)
                    .catch(this.catchError);
    }

    private proccessResponse(response: any): User{
        let res = response.json();
        let user = new User("");
        Object.assign(user, res.data.user);

        if (localStorage){
            localStorage.setItem("auth", res.data.token);
            localStorage.setItem("user", JSON.stringify(user));
        }
        return user;
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