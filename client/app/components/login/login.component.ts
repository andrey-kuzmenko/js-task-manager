import {Component} from "@angular/core";
import {UserService} from "../../services/user.services";
import {User} from "../../Models/User";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls:  ['login.component.css']
})
export class LoginComponent {

    username: string;
    password: string;

    getUser(event: any) {
        event.preventDefault();
        console.log(this);

    }

    constructor(private userService: UserService, private router: Router) {
    }
}
