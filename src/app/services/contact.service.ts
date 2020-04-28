import { AuthService } from './Authentication/auth.service';
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

   

 


}