import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {CookieService} from 'angular2-cookie/core';

import { AppComponent } from './app.component';
import { SignUpComponent } from './home/signup/signup.component';
import { SignInComponent } from './home/signin/signin.component';
import { SignInManagerComponent } from './home/signin-manager/signin.component';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/nav/nav.component';
import { ActiveNavComponent } from './active/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';

//user logged in pages
import { ProfileComponent } from './active/profile/profile.component';
import { AccountComponent } from './active/accounts/accounts.component';
import { SearchComponent } from './active/search/search.component';
import { FavoritesComponent } from './active/favorites/favorites.component';
import { DatesComponent } from './active/dates/dates.component';


import { PersonService } from './models/person/service/person.service';
import { UserService } from './models/user/service/user.service';
import { AccountService } from './models/account/service/account.service';
import { ProfileService } from './models/profile/service/profile.service';
import { LikeService } from './models/like/service/like.service';
import { DatesService } from './models/dates/service/dates.service';
import { ReportsComponent } from './manager/reports/reports.component';
import { SharedService } from './active/service/shared.service';
import { ReportService } from './manager/service/service';
import { UsersComponent } from './manager/users/users.component';
import { DatesStatsComponent } from './manager/dates/dates.component';
import { RevenueComponent } from './manager/reveune/reveune.component';
import { EmployeesComponent } from './manager/employees/employees.component';
import { CustomersComponent } from './manager/customers/customers.component';
import { CustDataComponent } from './manager/custData/customers.component';
import { CustDatesComponent } from './manager/custDate/dates.component';
import { BlindDateComponent } from './active/blindDate/dates.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    HomeNavComponent,
    ProfileComponent,
    AccountComponent,
    ActiveNavComponent,
    SearchComponent,
    FavoritesComponent,
    DatesComponent,
    SignInManagerComponent,
    ReportsComponent,
    UsersComponent,
    DatesStatsComponent,
    RevenueComponent,
    EmployeesComponent,
    CustomersComponent,
    CustDataComponent,
    CustDatesComponent,
    BlindDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PersonService, CookieService,AccountService, UserService, SharedService,
  ProfileService, LikeService, DatesService, ReportService],
  bootstrap: [AppComponent]
})

export class AppModule {
 }
