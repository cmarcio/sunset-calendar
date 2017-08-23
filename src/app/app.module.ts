import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';
import {Ng2Webstorage} from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { UserService } from './services/user.service';
import { AgendaService } from './services/agenda.service';
import { AuthenticationService } from './services/authentication.service';

import { AppRoutingModule }     from './app-routing.module';
import { AgendasComponent } from './components/agendas/agendas.component';
import { AgendaEditorComponent } from './components/agenda-editor/agenda-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AgendasComponent,
    AgendaEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ColorPickerModule,
    Ng2Webstorage
  ],
  providers: [
    UserService,
    AgendaService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
