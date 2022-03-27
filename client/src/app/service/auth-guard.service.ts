import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly router: Router) {}
  canActivate(): boolean {
    // if the user logged in can access the page
    // check page if login
  


    if (localStorage.getItem('token')) {
      return true;
    }
    // if the user not logged in redirect to login page
    this.router.navigate(['login']);
    return false;

  }
}
