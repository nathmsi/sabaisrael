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
    productSearch: any[] = [];
    productSearchSubject = new Subject<Product[]>();

    MainMenu: string[] =
        ["Kippots", "Books", "Tefilins", "Breslev", "Mezouzots", "Pessah", "Klafims", "Hanouka", "Tallits"]

    object_: Object = {
        "Kippots": [
            "Kippots"
        ],
        "Hollidays": [
            "Pessah",
            "Hanouka"
        ],
        "Tallits": [
            "Tallits"
        ],
        "Mezouzots": [
            "Mezouzots",
            "Klafims"
        ],
        "Books": [
            "Books"
        ],
        "Breslev": [
            "Breslev"
        ],
        "Tefilins": [
            "Tefilins"
        ]
    }


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

    emitProductSearch() {
        this.productSearchSubject.next(this.productSearch);
    }

    emitShoppingCard() {
        this.shoppingCardSubject.next(this.productsshoppingCard);
    }

    getProductMapSearch() {
        console.log("%c getProductMapSearch() ", "color:yellow");
        firebase.database().ref('/products-search')
            .once('value',
                (data) => {
                    const dataR = data.val() ? Object.keys(data.val()).map((i) => {
                        let element = data.val()[i];
                        //this.getSearchProductById(element.id);
                        return element;
                    }) : [];
                    this.productSearch = dataR;
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


    setProductSearch(name, categorie, id) {
        firebase.database().ref('/products-search').push({
            name,
            categorie,
            id
        })
            .then(() => {
            },
                () => {
                })
    }

    setProductMap(categorie: string) {
        firebase.database().ref('/products/' + categorie)
            .once('value', (data) => {
                const dataR = data.val() ? Object.keys(data.val()).map((i) => {
                    let element = data.val()[i];
                    this.setProductSearch(element.name, element.categorie, i);
                    element.id = i;
                    return element;
                }) : [];
            },
                (error) => {
                }
            )
    }

    setCategorieMap(categories: string[]) {
        console.log('setCategorieMap per categroie');
        categories.forEach(
            categorie => {
                this.setProductMap(categorie)
            }
        )
    }

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

    getProductByID_Categorie(categorie: string, id: string) {
        console.log(`%c getProductByID_Categorie() ${categorie} id ${id}`, "color:yellow");
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products/' + categorie + '/' + id)
                    .once('value', (data) => {
                        resolve(data.val());
                    },
                        (error) => {
                            reject(error);
                        }
                    );
            }
        )
    }

    getProductByCategorieLimited(categorie: string, limitedNumber: number) {
        console.log(`%c getProductByCategorieLimited() ${categorie} limit ${limitedNumber}`, "color:yellow");
        return new Promise(
            (resolve, reject) => {
                firebase.database().ref('/products/' + categorie).limitToFirst(limitedNumber)
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
                    .then((product) => {
                        console.log("%c createNewBook => ", "color:yellow", product);
                        //this.getProductByCategorie(newProduct.categorie);
                        this.setProductSearch(newProduct.name, newProduct.categorie, product.key);
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
                        this.getSearchProductById(product.id).then(
                            (data) => {
                                if (data) {
                                    let id = Object.keys(data);
                                    firebase.database().ref('/products-search/' + id).set({
                                        name: product.name,
                                        categorie: product.categorie,
                                        id: product.id
                                    })
                                        .then(() => {
                                            resolve();
                                        },
                                            (error) => {
                                                reject(error);
                                            })
                                }
                            }
                        )
                        //this.getProductByCategorie(product.categorie);
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
                                    this.getSearchProductById(product.id).then(
                                        (data) => {
                                            if (data) {
                                                let id = Object.keys(data);
                                                firebase.database().ref('/products-search/' + id).remove()
                                                    .then(() => {
                                                        resolve();
                                                    },
                                                        (error) => {
                                                            reject(error);
                                                        })
                                            }
                                        }
                                    )
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