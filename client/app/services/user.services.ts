import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../Models/User';

@Injectable()
export class UserService {
    public userCreated: EventEmitter<User[]> = new EventEmitter();

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

}