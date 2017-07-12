import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { User } from '../models/User';
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    public newUser = new Subject<any>();

    constructor(private http: Http) {
        console.log('User Service Initialised ...');
    }

    auth(data) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http
            .post('/users/login', JSON.stringify(data), { headers: headers })
            .map(res => res.json());
    }

    addUser(newUser: User) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http
            .post('/users/register', JSON.stringify(newUser), { headers: headers })
            .map(res => res.json());
    }

    static checkCredentials(router: Router) {
        if (localStorage.getItem("user") === null) {
            router.navigate(['login']);
        }
    }

    logout() {
        localStorage.removeItem("user");
    }

    loginUser(user){
        this.newUser.next(user);
    }

}