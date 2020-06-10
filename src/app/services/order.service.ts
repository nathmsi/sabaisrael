import { Injectable } from '@angular/core';
import { httpClientCrudService } from './Authentication/httpService.service';
import { Order } from '../models/order.model';



@Injectable()
export class OrderService {


    collection: string = 'orders';


    constructor(
        private httpService: httpClientCrudService
    ) {
    }





    //////////////////////////////////////////////////////// ************* /////////////////////////////////////////////////////////////////

    /////////////////////////////////////************* STORE PRODUCT ADD UPDATE REMOVE *************/////////////////////////////////////////////


    // getOrders() {
    //     return new Promise(
    //         (resolve, reject) => {
    //             this.httpService.get(this.collection).then(
    //                 (data) => resolve(data),
    //                 (error) => {
    //                     console.log('error getOrders() ', error);
    //                     reject(error);
    //                 }
    //             )
    //         }
    //     )
    // }

    // getOrder(id: string) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             this.httpService.get(this.collection + '/' +  id).then(
    //                 (data) => resolve(data),
    //                 (error) => {
    //                     console.log('error categorie ', error);
    //                     reject(error);
    //                 }
    //             )
    //         }
    //     )
    // }


    createNewOrder(newOrder: Order) {
        return new Promise(
            (resolve, reject) => {
                this.httpService.post(this.collection + '/' , newOrder).then(
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

    // updateOrder(order: Order) {
    //     return new Promise(
    //         (resolve, reject) => {
    //             this.httpService.put(this.collection + '/', order).then(
    //                 (data) => {
    //                     console.log(data);
    //                     resolve();
    //                 },
    //                 (error) => {
    //                     reject(error);
    //                     console.log(error);
    //                 }
    //             )
    //         });
    // }








}