import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
const seperateEmailsFromString=(email:string)=>{
  const emails=[]
  const emailsString=email.split('\n')
  for(let i=0;i<emailsString.length;i++){
    emails.push(emailsString[i].trim())
  }
  return emails
}
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  errorMessage:string=""
  form:any
  constructor(
    private http:HttpClient,
    private formBuilder:FormBuilder
  ) { }
  
  @Output() isOpenEvent=new EventEmitter<boolean>()

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name:"",
      emails:"",
      reference:"",
      date_compte:"",
      n_compte:"",
      fluide:""
    })
  }
  submit(){
    if(this.form.value.emails.split('\n').filter((email:string)=>!(new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(email)) ).length > 0 ) {
      this.errorMessage="certains e-mails ne sont pas valides"
      return;
    }
    this.http.post('http://localhost:8080/api/v1/clients',{...this.form.getRawValue(),emails:JSON.stringify(seperateEmailsFromString(this.form.value.emails))},{
      headers:{
        'Content-Type':'application/json',
        "Authorization":"Bearer "+localStorage.getItem('token')
      }
    }).subscribe(
      (res: any) => {
        this.isOpenEvent.emit()
        window.location.reload()
      },
      err => {
        console.log(err.error.message)
      }
    );
  }
  closeModal(): void 
  {
    this.isOpenEvent.emit();
  }
}
