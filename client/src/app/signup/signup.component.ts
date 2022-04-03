import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errors: any = null;
  errorMessage: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }
  submit() {
 const  {email,password,name}=this
    this.http
      .post(
        'http://localhost:8080/api/v1/users/signup',
        {
          email,
          password,
          name,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe((e: any) => {
        localStorage.setItem('token', e?.token);
        this.router.navigate(["login"])
      },err=>{
        console.log(err);
        this.errors=err.error.error.errors
        this.errorMessage=(err.error.message)
      });
  }
}
