import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
const seperateEmailsFromString = (email: string) => {
  const emails = [];
  const emailsString = email.split('\n');
  for (let i = 0; i < emailsString.length; i++) {
    emails.push(emailsString[i].trim());
  }
  return emails;
};
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  message: string = "you're not logged in";

  constructor(private http: HttpClient, private router: Router) {}

  selectedClient: any;
  Clients: any[] = [];
  isOpen: boolean = false;
  isOpenDelete: boolean = false;
  isOpenEdit: boolean = false;
  isOpenAdd: boolean = false;
  pages: number[] = [5, 10, 15, 20];
  clientsFiltered: any[] = [];

  name: string = '';
  fluide: string = '';
  compte: string = '';
  ref: string = 'Tous';

  onSearch() {
    this.clientsFiltered = this.Clients.filter(
      (client) =>
        (this.name == '' ||
          client.name.toLowerCase().includes(this.name.toLowerCase())) &&
        (this.fluide == '' ||
          client.fluide.toLowerCase().includes(this.fluide.toLowerCase())) &&
        (this.compte == '' ||
          client.n_compte.toLowerCase().includes(this.compte.toLowerCase())) &&
        (this.ref == 'Tous' ||
          client.reference.toLowerCase().includes(this.ref.toLowerCase()))
    );
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/v1/clients').subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        this.Clients = res?.Clients;
        this.clientsFiltered = this.Clients;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }
  navTo(_id: string) {
    this.router.navigate([`/clients/${_id}`]);
  }
  openDeletePopup(client: any): void {
    this.selectedClient = client;
    this.togglePopup_delete();
  }
  openEditPopup(client: any): void {
    this.selectedClient = client;
    this.togglePopup_Edit();
  }

  togglePopup(): void {
    // e.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  togglePopup_delete(): void {
    // e.stopPropagation();
    this.isOpenDelete = !this.isOpenDelete;
  }
  togglePopup_Edit(): void {
    this.isOpenEdit = !this.isOpenEdit;
  }
  togglePopup_Add(): void {
    this.isOpenAdd = !this.isOpenAdd;
  }
  confirm(): void {
    this.http
      .delete(`http://localhost:8080/api/v1/clients/${this.selectedClient._id}`)
      .subscribe((res: any) => {
        this.Clients = this.Clients.filter(
          (client) => client._id != this.selectedClient._id
        );
        this.togglePopup_delete();
        setTimeout(() => window.location.reload(), 500);
      });
  }
  confirmEditEmail(emails: string) {
    this.http
      .put(`http://localhost:8080/api/v1/clients/${this.selectedClient._id}`, {
        emails: seperateEmailsFromString(emails),
      })
      .subscribe((res: any) => {
        this.togglePopup_Edit();
        window.location.reload();
      });
  }
}
