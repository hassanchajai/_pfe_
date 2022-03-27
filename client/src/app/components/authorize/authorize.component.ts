import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css'],
})
export class AuthorizeComponent implements OnInit {
  constructor() {}
  @Output() isOpenEvent = new EventEmitter<boolean>();
  @Output() confirmDeleteEvent = new EventEmitter<boolean>();

  ngOnInit(): void {}
  closeModal(): void {
    this.isOpenEvent.emit();
  }
  confirm(){
    this.confirmDeleteEvent.emit();
    
  }
}
