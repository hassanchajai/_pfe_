import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  constructor() { }
  NotifOpen:boolean=false;
  ngOnInit(): void {
  }
  Notif(){
    this.NotifOpen=!this.NotifOpen;
  }
  closeNotif(){
    this.NotifOpen=false;
  }
  logout(){
    localStorage.removeItem("token");
    window.location.reload()
  }


}
