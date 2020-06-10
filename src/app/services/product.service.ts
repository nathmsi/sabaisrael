import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/storage';

import { AuthService } from './Authentication/auth.service';
import { delay } from 'rxjs/operators';
import { Subscription, forkJoin, of } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { LocalStorageService } from './storageLocalStorage.service';
import { httpClientCrudService } from './Authentication/httpService.service';


@Injectable()
export class ProductService {

    products: Product[] = [];
    productsshoppingCard: any[] = [];
    productsSH: Product[] = [];
    productsSubject = new Subject<Product[]>();
    shoppingCardSubject = new Subject<Product[]>();
    userUid: string = "";
    userSubscription: Subscription;
    private menus: string[] = [];
    productSearch: Product[] = [];
    productSearchSubject = new Subject<Product[]>()


    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private httpService: httpClientCrudService
    ) {
        this.userSubscription = this.authService.userSubject.subscribe(
            (user: User) => {
                this.userUid = user.uid;
            }
        );
        this.authService.emitUser();
        this.LoadMenus();
    }

    emitProduct() {
        this.productsSubject.next(this.products);
    }

    emitProductSearch() {
        this.productSearchSubject.next(this.productSearch);
    }

    emitShoppingCard() {
        this.shoppingCardSubject.next(this.productsshoppingCard);
    }


    ////////////////////////////////////////************* SHOPPING-CART  ADD  UPDATE  REMOVE  *************//////////

    getShoppingCard() {
        this.productsshoppingCard = this.localStorageService.getLocalStorageProductCard();
        this.emitShoppingCard();
    }

    addToShoppingCard(product: Product) {
        this.localStorageService.storeOnLocalStorageProductCard(product.id, product.categorie);
        this.getShoppingCard();
    }

    deleteProductCard() {
        this.localStorageService.deleteProductCard();
        this.getShoppingCard();
    }

    deleteOneProductCard(id: string) {
        this.localStorageService.deleteOneProductCard(id);
        this.getShoppingCard();
    }

    updateCountProduct(count: number, id: string) {
        this.localStorageService.updateCountProduct(count, id);
        this.getShoppingCard();
    }


    requestDataFromSH(list: any[]) {
        let observables = [];
        let ids = list.map(e => e.id);

        observables.push(this.getIdsProducts(ids.slice(0, 10), 0));
        ids = ids.slice(10, ids.length);
        while (ids.length > 10) {
            observables.push(
                this.getIdsProducts(ids.slice(0, 10), 500)
            );
            ids = ids.slice(10, ids.length);
        }
        ids.length > 0 && observables.push(this.getIdsProducts(ids.slice(0, 10), 500));

        //console.log(observables);
        return forkJoin(observables);
    }

    getIdsProducts(ids, timout) {
        return new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        this.httpService.post('products/list/ids', { ids }).then(
                            (data) => {
                                resolve(data);

                            },
                            (error) => {
                                resolve([]);
                                console.log(error);
                            }
                        )
                    }
                    , timout
                )
            }
        )
    }

    //////////////////////////////////////////////////////// ************* /////////////////////////////////////////////////////////////////

    /////////////////////////////////////************* STORE PRODUCT ADD UPDATE REMOVE *************/////////////////////////////////////////////


    getProductByCategorie(categorie: string, last: string) {
        return new Promise(
            (resolve, reject) => {
                const lastId = last === '' ? 'none' : last;
                const path = 'products/categorie/' + categorie + '/' + lastId;
                this.httpService.get(path).then(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        console.log('error categorie home ', error);
                        reject(error);
                    }
                )
            }
        )
    }

    getProductByID_Categorie(categorie: string, id: string) {
        return new Promise(
            (resolve, reject) => {
                this.httpService.get('products/' + id).then(
                    (data) => resolve(data),
                    (error) => {
                        console.log('error categorie ' + categorie, error);
                        reject(error);
                    }
                )
            }
        )
    }

    getProductByCategorieLimited(last: string) {
        return new Promise(
            (resolve, reject) => {
                const lastId = last === '' ? 'none' : last;
                this.httpService.get('products/list/pagination/' + lastId).then(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        console.log('error categorie home ', error);
                        reject(error);
                    }
                )
            }
        )
    }











    //////////////////////////////////////////////////////// ************* /////////////////////////////////////////////////////////////////

    ////////////////////////////////////************* SEARCH PRODUCT *************///////////////////////////////////////////////

    getProductMapSearch() {
        console.log("%c getProductMapSearch() ", "color:yellow");
        firebase.database().ref('/products-search')
            .once('value',
                (data) => {
                    let result = []
                    Object.keys(data.val()? data.val() : []).forEach((i) => {
                        let element = data.val()[i];
                        result.push(element);
                    });
                    //console.log(result);
                    this.productSearch = result;
                    this.emitProductSearch();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    getSearchProductById(id: string) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products-search').orderByChild('id').equalTo(id).once('value').then(
                    (data) => {
                        if (data.val()) {
                            console.log(data.val());
                            resolve(data.val());
                        } else {
                            reject();
                        }
                    },
                    (error) => {
                        console.log(error);
                        reject();
                    })
            }
        )
    }





    //////////////////////////// ************* ////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////************* MENU PRODUCT MAIN & CATEGORIE *************//////////////////////////////////////

    getMenus() {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products-menu')
                    .once('value',
                        (data) => {
                            let result = [];
                            if (data.val()) {
                                let menus = data.val();
                                menus.forEach((element: any) => {
                                    element.value.forEach(val => {
                                        result.push(val);
                                    });
                                });
                            }
                            //this.setCategorieMap(result);
                            resolve(result);
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        }
                    );
            })
    }

    getMainMenus() {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products-menu')
                    .once('value',
                        (data) => {
                            const dataR = data.val() ? data.val() : [];
                            resolve(dataR);
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        }
                    );
            })
    }

    LoadMenus() {
        firebase.database().ref('/products-menu')
            .once('value',
                (data) => {
                    if (data.val()) {
                        this.menus = data.val();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }








}