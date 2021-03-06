import { Component, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.services';
import { Task } from '../../models/Task';
import {UserService} from "../../services/user.services";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html',
})
export class TasksComponent {
    tasks: Task[];
    title: string;

    updateStatus(task: Task) {
        var _task = {
            _id: task._id,
            title: task.title,
            detail: task.detail,
            implementer: task.implementer,
            isDone: !task.isDone
        }

        this.taskService.updateStatus(_task)
            .subscribe(data => {
                task.isDone = !task.isDone;
                console.log('updated inside tasks component');
                this.taskService.tasksUpdated.emit(this.tasks);
            },
            error => {
                this.router.navigate(['error'], { queryParams: { err: error } });
            })
    }



    addTask(event: any) {
        event.preventDefault();
        console.log(this.title);

        var newTask: Task = {
            _id: null,
            title: this.title,
            detail: this.detail,
            implementer: this.implementer,
            isDone: false
        }

        this.taskService.addTask(newTask)
            .subscribe(savedTask => {
                this.tasks.push(savedTask);
                this.title = '';
                this.detail = '';
                this.implementer = '';
                this.taskService.tasksUpdated.emit(this.tasks);
            },
            error => {
                this.router.navigate(['error'], { queryParams: { err: error } });
            })

    }
    deleteTask(id: any) {
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                        this.taskService.tasksUpdated.emit(this.tasks);
                    }
                }
            }
        },
        error => {
            this.router.navigate(['error'], { queryParams: { err: error } });
        });

    }

    ngOnInit(){
        UserService.checkCredentials(this.router);
    }

    constructor(private taskService: TaskService, private router: Router) {
        this.taskService
            .getTasks()
            .subscribe(tasks => {
                console.log(tasks);
                this.tasks = tasks;
                this.taskService.tasksUpdated.emit(this.tasks);
            },
            error => {
                this.router.navigate(['login']);
            });
    }
}