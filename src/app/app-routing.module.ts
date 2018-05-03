import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './home/signup/signup.component';
import { SignInComponent } from './home/signin/signin.component';
import { SignInManagerComponent } from './home/signin-manager/signin.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './active/profile/profile.component';
import { AccountComponent } from './active/accounts/accounts.component';
import { FavoritesComponent } from './active/favorites/favorites.component';
import { SearchComponent } from './active/search/search.component';
import { DatesComponent } from './active/dates/dates.component';
import { ReportsComponent } from './manager/reports/reports.component';
import { UsersComponent } from './manager/users/users.component';
import { DatesStatsComponent } from './manager/dates/dates.component';
import { RevenueComponent } from './manager/reveune/reveune.component';
import { EmployeesComponent } from './manager/employees/employees.component';
import { CustomersComponent } from './manager/customers/customers.component';
import { CustDataComponent } from './manager/custData/customers.component';
import { CustDatesComponent } from './manager/custDate/dates.component';
import { BlindDateComponent } from './active/blindDate/dates.component';
import { HelpComponent } from './active/help/accounts.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'account', component: AccountComponent},
  { path: 'search', component: SearchComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: 'dates', component: DatesComponent},
  { path: 'manager', component: SignInManagerComponent},
  { path: 'reports', component: ReportsComponent},
  { path: 'user-stats', component: UsersComponent},
  { path: 'date-stats', component: DatesStatsComponent},
  { path: 'revenue-stats', component: RevenueComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'edit-customers', component: CustomersComponent},
  { path: 'report-customers', component: CustDataComponent},
  { path: 'cust-dates', component: CustDatesComponent},
  { path: 'blindDate', component: BlindDateComponent},
    { path: 'help', component: HelpComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
