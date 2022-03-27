import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:any
  errorMessage: string="";
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // if(localStorage.getItem('token')){
    //   this.router.navigate(["/"])
    // }
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  submit(){
    this.errorMessage =  ""

    this.http.post('http://localhost:8080/api/v1/users/signin', this.form.getRawValue()).subscribe((e:any)=>{
      localStorage.setItem('token', e?.token);
      this.router.navigate(["/"])
    },
    (err)=>{
      this.errorMessage =  (err.error.message)
    }
    )
  }
}
