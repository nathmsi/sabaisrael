import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css']
})
export class ContactUpdateComponent implements OnInit {

  contacts: Contact[] = [];
  message: string = "";
  dataReceive: boolean = false;

  constructor(private contactsService: ContactService) { }

  ngOnInit(): void {
    this.getContactsFromDB();
  }


  getContactsFromDB() {
    this.dataReceive = false;
    this.contacts = [];
    this.contactsService.getContacts().then(
      (data: Contact[]) => {
        //console.log(data);
        this.dataReceive = true;
        this.contacts = data;
      },
      (error) => {
        this.dataReceive = true;
        console.log(error);
      }
    )
  }


  sendMessage = (contact: Contact) => {
    //console.log(contact);
    this.contactsService.updateContact(contact).then(
      () => {
        console.log(' sendMessagesuccess');
        this.getContactsFromDB();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteElement = (id: string) => {
    console.log(id);
    this.contactsService.deleteContact(id).then(
      () => {
        console.log('success');
        this.getContactsFromDB();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
