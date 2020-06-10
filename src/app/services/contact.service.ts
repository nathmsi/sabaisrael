import { AuthService } from './Authentication/auth.service';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { httpClientCrudService } from './Authentication/httpService.service';


@Injectable()
export class ContactService {

    collection: string = 'contacts';




    constructor(
        private httpService: httpClientCrudService
        ) {
    }






    // createNewContact(newObject: Contact) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             this.authService.server.database().ref('contacts/requests').push(newObject)
    //                 .then(
    //                     () => {
    //                         console.log("%c createNewContact ", "color:yellow", newObject);
    //                         resolve();
    //                     },
    //                     (error) => {
    //                         reject(error);
    //                     })
    //         }
    //     )
    // }

    createNewContact(newContact: Contact) {
        return new Promise(
            (resolve, reject) => {
                this.httpService.post(this.collection + '/' , newContact).then(
                    (id) => {
                        console.log(id);
                        resolve(id);
                    },
                    (error) => {
                        reject(error);
                        console.log(error);
                    }
                )
            }
        )
    }

   

 


}