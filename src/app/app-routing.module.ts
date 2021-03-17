import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

//guards
import {AuthGuard} from './guards/auth.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path : "",
    component : LobbyComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'signin',
    component: SigninComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path : 'signup',
    component: SignupComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path : "**",
    component : LobbyComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
