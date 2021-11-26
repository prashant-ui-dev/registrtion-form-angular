import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './user-registration/register/register.component';
import { UsersComponent } from './user-registration/users/users.component';




const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path: 'register', component: RegisterComponent},
  {path:'users', component:UsersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),UserRegistrationModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
