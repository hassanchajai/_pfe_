import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errors:any=null;
  errorMessage: string="";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  formGroup: any;

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.router.navigate(["/"])
    }
    
    this.formGroup = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    });
  }
  submit() {
    this.http
      .post(
        'http://localhost:8080/api/v1/users/signup',
        this.formGroup.getRawValue()
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
