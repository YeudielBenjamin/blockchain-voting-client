import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { SettingsComponent } from "./settings/settings.component";
import { ElectionComponent } from "./election/election.component";
import { VoteComponent } from "./vote/vote.component";
import { environment } from "../environments/environment"

const APP_ROUTES: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full"},
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "user", component: UserComponent },
    { path: "election", component: ElectionComponent },
    { path: "settings", component: SettingsComponent },
    { path: "vote", component: VoteComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            APP_ROUTES,
            { enableTracing: !environment.production }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {} 