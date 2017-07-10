import { Component } from '@angular/core';
import {TaskService} from './services/task.services'
import {UserService} from "./services/user.services";

@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers:[TaskService, UserService]
})
export class AppComponent { name = 'Diff' }