import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AllbooksComponent } from './core/allbooks/allbooks.component';
import { MybooksComponent } from './core/mybooks/mybooks.component';
import { MyprofileComponent } from './core/myprofile/myprofile.component';
import { AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'allbooks', component: AllbooksComponent , canActivate: [AuthGuard]},
  { path: 'mybooks', component: MybooksComponent, canActivate: [AuthGuard]},
  { path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
