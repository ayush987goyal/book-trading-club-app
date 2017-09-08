import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AllbooksComponent } from './core/allbooks/allbooks.component';
import { MybooksComponent } from './core/mybooks/mybooks.component';
import { MyprofileComponent } from './core/myprofile/myprofile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'allbooks', component: AllbooksComponent },
  { path: 'mybooks', component: MybooksComponent},
  { path: 'myprofile', component: MyprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
