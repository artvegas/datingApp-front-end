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
  { path: 'user-stats', component: UsersComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
