import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ClarityModule } from "clarity-angular";
import { HttpModule } from '@angular/http';

/** Componentes */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

/** Servicios */
import { LoginService } from "./login/login.service";
import { SettingsService } from "./settings/settings.service";
import { VoteService } from "./vote/vote.service";

/** Módulos */
import { AppRoutingModule } from "./app-routing.module";
import { ElectionComponent } from './election/election.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { VoteComponent } from './vote/vote.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ElectionComponent,
    UserComponent,
    SettingsComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ClarityModule.forRoot()
  ],
  providers: [
    LoginService,
    SettingsService,
    VoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
