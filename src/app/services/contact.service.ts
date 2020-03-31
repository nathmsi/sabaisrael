import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';


@Injectable()
export class ContactService {




    constructor(private authService: AuthService) {
    }






    createNewContact(newObject: Contact) {
        return new Promise(
            (resolve, reject) => {
                this.authService.server.database().ref('contacts/requests').push(newObject)
                    .then(
                        () => {
                            console.log("%c createNewContact ", "color:yellow", newObject);
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        })
            }
        )
    }

    getContacts() {
        return new Promise(
            (resolve, reject) => {
                this.authService.server.database().ref('/contacts/requests').limitToLast(10)
                    .once('value', (data) => {
                        const dataR = data.val() ? Object.keys(data.val()).map((i) => {
                            let element = data.val()[i];
                            element.id = i;
                            return element;
                        }) : [];
                        resolve(dataR);
                    },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        )
    }


    deleteContact(id: string) {
        return new Promise(
            (resolve, reject) => {
                this.authService.server.database().ref('/contacts/requests/' + id).remove()
                    .then(
                        () => {
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        )
    }

    updateContact(contact: Contact) {
        return new Promise(
            (resolve, reject) => {
                this.authService.server.database().ref('/contacts/answers' ).push(contact)
                    .then(
                        () => {
                            this.deleteContact(contact.id);
                            resolve();
                        },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        )
    }

}