
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';


@Injectable()
export class httpClientCrudService {


    apiUrl: string = 'https://us-central1-saba-israel.cloudfunctions.net/webApi/api/v1/';

  
    header: any;
    userSubject: Subscription;
    token: string ="";




    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {
        this.userSubject = this.authService.userSubject.subscribe(
            (user) => {
                if (user.token) {
                    this.token = user.token;
                    this.header = {
                        //responseType: 'text' as 'json',
                        headers: new HttpHeaders()
                            .set('Authorization', `Bearer ${user.token}`)
                            .set('responseType', '')
                    }
                }
            }
        )
        this.authService.emitUser();
    }






    get(path) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get(this.apiUrl + path, this.header).subscribe({
                    next: data => resolve(data),
                    error: error => reject(error)
                })
            }
        )
    }

    post(path, data) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.post(this.apiUrl + path, data, this.header).subscribe({
                    next: data => resolve(data),
                    error: error => reject(error.error)
                })
            }
        )
    }
    
    
    put(path, data) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.put(this.apiUrl + path + data.id, data, this.header).subscribe({
                    next: data => resolve(data),
                    error: error => reject(error.error)
                })
            }
        )
    }

    delete(path, data) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.delete(this.apiUrl + path + data.id, this.header).subscribe({
                    next: data => resolve(data),
                    error: error => reject(error.error)
                })
            }
        )
    }





}