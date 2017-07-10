import {Component} from "@angular/core";
import {UserService} from "../../services/user.services";
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

    login(event: any) {
        event.preventDefault();
        const data = {
            username : this.username,
            password : this.password
        };

        this.userService.auth(data).subscribe(saved => {
            console.log("success: " + saved);
            this.router.navigate(['/task']);
        },
        err => console.log("err1: " + err));

    }

    constructor(private userService: UserService, private router: Router) {
    }
}
