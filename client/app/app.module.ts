import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PieComponent } from './components/pie/pie.component';
import { FormsModule} from '@angular/forms';
import {RegisterComponent} from "./app.register/register.component";

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [AppComponent, TasksComponent, PieComponent, RegisterComponent],
    bootstrap: [AppComponent]
})
export class AppModule { 
    
}