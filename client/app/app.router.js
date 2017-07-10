"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var tasks_component_1 = require("./components/tasks/tasks.component");
var register_component_1 = require("./components/register/register.component");
var login_component_1 = require("./components/login/login.component");
exports.router = [
    { path: '', redirectTo: 'task', pathMatch: 'full' },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'task', component: tasks_component_1.TasksComponent }
];
exports.routes = router_1.RouterModule.forRoot(exports.router);
//# sourceMappingURL=app.router.js.map