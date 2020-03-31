import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/modal-confirmation/modal-confirmation.component';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent implements OnInit {
  @Input() contact: Contact;
  @Input() sendMessage: Function;
  @Input() deleteElement: Function;

  message: string = "";
  showAnswer: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sendMessage_ = () => {
    this.contact.answer = this.message;
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm the message : " + this.message
    });
    dialogRef.afterClosed().subscribe(result => {
      result && this.sendMessage(this.contact);
    });
   
  }

  openAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  deleteElement_ = () => {

    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      result &&  this.deleteElement(this.contact.id);
    });

   
  }

  

}
