import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css'],
})
export class ModifyComponent implements OnInit {
  errorMessage:string="";
  form: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}
  @Output() isOpenEvent = new EventEmitter<boolean>();
  @Output() confirmEvent = new EventEmitter<string>();
  @Input() client: any;
  emails: string = '';
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emails: '',
    });
    this.emails = this.client?.emails.join('\n');
    console.log(this.emails);
  }
  closeModal(): void {
    this.isOpenEvent.emit();
  }
  submit() {
    if(this.form.value.emails.split('\n').filter((email:string)=>!(new RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ).test(email)) ).length > 0 ) {
      this.errorMessage="certains e-mails ne sont pas valides"
      return;
    }
    this.http.put(`http://localhost:8080/api/v1/clients/${this.client._id}`, { ...this.form.getRawValue(), emails: this.form.value.emails.split('\n') }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).subscribe(
      (res: any) => {
        console.log(res);
        this.isOpenEvent.emit();
        window.location.reload()
      }

    )
    this.isOpenEvent.emit();
  }
}
