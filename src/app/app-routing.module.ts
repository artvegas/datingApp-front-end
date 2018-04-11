import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './home/signup/signup.component';
import { SignInComponent } from './home/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './active/profile/profile.component';
import { AccountComponent } from './active/accounts/accounts.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'account', component: AccountComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
