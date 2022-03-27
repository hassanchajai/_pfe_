import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css'],
})
export class DetailClientComponent implements OnInit {
  client:any=null;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const param: string = this.router.url.replace('/clients/', '');
    this.http.get(`http://localhost:8080/api/v1/clients/${param}`,{
      headers:{
        "Authorization":"Bearer "
      }
    }).subscribe((res:any)=>{
      this.client=res?.Client
    });
  }
}
