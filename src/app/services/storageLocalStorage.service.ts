import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Product } from '../models/product.model';


// key that is used to access the data in local storage
const STORAGE_KEY_PRODUCTS = 'List Shopping Card';
const STORAGE_KEY_THEME = 'ColorTheme';


@Injectable()
export class LocalStorageService {

    anotherTodolist = [];
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }


    // shopping card 

    storeOnLocalStorageProductCard(id: string,categorie: string): void {
        let product = {
            id,
            count: 0,
            categorie
        };
        let products = this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
        let countProducById = products.filter(e => e.id === id).length;
        if (countProducById === 0) {
            product.count = 1;
            products.push(product);
        } else {
            products.forEach(e => {
                if (e.id === product.id) {
                    e.count = e.count + 1;
                }
            })
        }
        this.storage.set(STORAGE_KEY_PRODUCTS, products);
        console.log('Shopping Card storeOnLocalStorageProductCard()', products || 'LocaL storage is empty');
    }

    getLocalStorageProductCard(): any {
        console.log("%c Local Storage Shopping Card getLocalStorageProductCard() ", "color:orange", this.storage.get(STORAGE_KEY_PRODUCTS));
        return this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
    }

    deleteProductCard() {
        console.log("%c Local Storage Shopping deleteProductCard() ", "color:orange");
        this.storage.set(STORAGE_KEY_PRODUCTS, []);
    }

    deleteOneProductCard(id: string) {
        let products = this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
        products = products.filter(e => e.id !== id);
        this.storage.set(STORAGE_KEY_PRODUCTS, products);
        console.log('Shopping Card deleteOneProductCard()', products || 'LocaL storage is empty');
    }

    updateCountProduct(count: number, id: string) {
        let products = this.storage.get(STORAGE_KEY_PRODUCTS) ? this.storage.get(STORAGE_KEY_PRODUCTS) : [];
        products.forEach(e => {
            if (e.id === id) {
                e.count = count;
            }
        })
        this.storage.set(STORAGE_KEY_PRODUCTS, products);
        console.log('Shopping Card updateCountProduct()', products || 'LocaL storage is empty');
    }




    //// storage them color

    setColorTheme(colorTheme: string ,textColor: string){
        this.storage.set(STORAGE_KEY_THEME, {
            colorTheme,
            textColor
        });
        console.log('setColorTheme()', {
            colorTheme,
            textColor
        } || 'LocaL storage is empty');
    }

    getColorTheme(){
        console.log("%c getColorTheme() ", "color:orange", this.storage.get(STORAGE_KEY_THEME));
        return this.storage.get(STORAGE_KEY_THEME) ? this.storage.get(STORAGE_KEY_THEME) : [];
    }



}