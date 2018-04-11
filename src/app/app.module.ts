import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {CookieService} from 'angular2-cookie/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './home/signup/signup.component';
import { SignInComponent } from './home/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/nav/nav.component';
import { ActiveNavComponent } from './active/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';

//user logged in pages
import { ProfileComponent } from './active/profile/profile.component';
import { AccountComponent } from './active/accounts/accounts.component';


import { PersonService } from './models/person/service/person.service';
import { UserService } from './models/user/service/user.service';
import { AccountService } from './models/account/service/account.service';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    HomeNavComponent,
    ProfileComponent,
    AccountComponent,
    ActiveNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PersonService, CookieService,AccountService, UserService],
  bootstrap: [AppComponent]
})

export class AppModule {
 }
