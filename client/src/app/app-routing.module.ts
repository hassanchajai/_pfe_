import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ClientsComponent } from './clients/clients.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: ClientsComponent },
      { path: 'clients/:id', component: DetailClientComponent },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  ClientsComponent,
  SignupComponent,
  DetailClientComponent,
];
