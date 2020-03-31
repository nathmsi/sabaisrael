import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/storage';

import { AuthService } from './auth.service';

import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { LocalStorageService } from './storageLocalStorage.service';



@Injectable()
export class ProductService {

    products: Product[] = [];
    productsshoppingCard: Product[] = [];
    productsSubject = new Subject<Product[]>();
    shoppingCardSubject = new Subject<Product[]>();
    userUid: string = "";
    userSubscription: Subscription;
    private menus: string[] = [];

    constructor(private authService: AuthService, private localStorageService: LocalStorageService) {
        this.userSubscription = this.authService.userSubject.subscribe(
            (user: User) => {
                this.userUid = user.uid;
            }
        );
        this.authService.emitUser();
        this.LoadMenus()
    }

    emitProduct() {
        this.productsSubject.next(this.products);
    }

    emitShoppingCard() {
        this.shoppingCardSubject.next(this.productsshoppingCard);
    }

    getMenus() {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products-menu')
                    .once('value',
                        (data) => {
                            if (data.val()) {
                                this.menus = data.val();
                            }
                            resolve(this.menus);
                        },
                        (error) => {
                            console.log(error);
                            reject(error);
                        }
                    );
            })
    }

    getProducts() {
        console.log("%c getProducts() ", "color:yellow");
        firebase.database().ref('/products')
            .on('value', (data) => {
                const dataR = data.val() ? Object.keys(data.val()).map((i) => {
                    let element = data.val()[i];
                    element.id = i;
                    return element;
                }) : [];
                this.products = dataR;
                this.emitProduct();
            }
            );
    }

    getProductByCategorie(categorie: string) {
        return new Promise(
            (resolve, reject) => {
                console.log(`%c getProducts() categorie ${categorie} `, "color:yellow");
                firebase.database().ref('/products/' + categorie)
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

    getShoppingCard() {
        this.productsshoppingCard = this.localStorageService.getLocalStorageProductCard();
        this.emitShoppingCard();
    }

    addToShoppingCard(product: Product) {
        this.localStorageService.storeOnLocalStorageProductCard(product);
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


    uploadFile(file: File, categorie: string) {
        return new Promise(
            (resolve, reject) => {
                const almostUniqueFileName = Date.now().toString();
                const upload = firebase.storage().ref()
                    .child('images/products/' + categorie + '/' + almostUniqueFileName + file.name).put(file);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log("%c Chargement… ", "color:yellow");
                    },
                    (error) => {
                        console.log("%c Erreur Chargement… ", "color:yellow", error);
                        reject();
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
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

    saveMenus(menus: string[]) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products-menu').set(menus)
                    .then(() => {
                        firebase.database().ref('/products-menu')
                            .once('value',
                                (data) => {
                                    if (data.val()) {
                                        this.menus = data.val();
                                    }
                                    resolve(this.menus);
                                },
                                (error) => {
                                    console.log(error);
                                    reject();
                                }
                            );
                    },
                        () => {
                            reject();
                        })
            }
        )
    }


    createNewProduct(newProduct: Product) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products/' + newProduct.categorie).push(newProduct)
                    .then(() => {
                        console.log("%c createNewBook => ", "color:yellow", newProduct);
                        this.getProductByCategorie(newProduct.categorie);
                        resolve();
                    },
                        () => {
                            reject();
                        })
            }
        )
    }

    updateProduct(product: Product) {
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products/' + product.categorie + '/' + product.id).set(product)
                    .then(() => {
                        console.log("%c updateProduct  ", "color:yellow", product);
                        this.getProductByCategorie(product.categorie);
                        resolve();
                    },
                        (error) => {
                            reject(error);
                        }
                    )
            });
    }

    removeProduct(product: Product) {
        return new Promise(
            (resolve, reject) => {
                if (product.photo) {
                    const storageRef = firebase.storage().refFromURL(product.photo);
                    storageRef.delete().then(
                        () => {
                            console.log("%c Photo removed!  ", "color:yellow");
                            firebase.database().ref('/products/' + product.categorie + '/' + product.id).remove().then(
                                () => {
                                    console.log("%c products removed! ", "color:yellow", product);
                                    this.emitProduct();
                                    resolve();
                                },
                                (error) => {
                                    reject(error);
                                    console.log("%c products removed error  ", "color:red", error);
                                }
                            );
                        },
                        (error) => {
                            console.log("%c Photo removed error ", "color:red", error);
                            firebase.database().ref('/products/' + product.categorie + '/' + product.id).remove().then(
                                () => {
                                    console.log("%c products removed! ", "color:yellow", product);
                                    this.emitProduct();
                                    resolve();
                                },
                                (error) => {
                                    reject(error);
                                    console.log("%c products removed error  ", "color:red", error);
                                }
                            );
                        }
                    );
                }
            }
        )
    }



    updateProductImage(file: File, photo: string, categorie: string) {
        return new Promise(
            (resolve, reject) => {
                const storageRef = firebase.storage().refFromURL(photo);
                storageRef.delete().then(
                    () => {
                        console.log("%c Photo update last removed!  ", "color:yellow");
                        this.uploadFile(file, categorie).then(
                            (url) => {
                                resolve(url);
                            },
                            (error) => {
                                console.log("%c Photo update error ", "color:red", error);
                                reject();
                            }
                        )
                    },
                    (error) => {
                        console.log("%c Photo delete error ", "color:red", error);
                        this.uploadFile(file, categorie).then(
                            (url) => {
                                resolve(url);
                            },
                            (error) => {
                                console.log("%c Photo update error ", "color:red", error);
                                reject();
                            }
                        )
                    }
                );
            }
        );
    }





}