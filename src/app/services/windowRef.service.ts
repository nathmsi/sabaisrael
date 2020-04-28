import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WindowReference } from '../models/windowRef.model';
import { LocalStorageService } from './storageLocalStorage.service'

@Injectable()
export class WindowRef {
    windowRef: WindowReference = new WindowReference(false);
    windowSubject = new Subject<WindowReference>();

    constructor(
       private storageLocalService: LocalStorageService
    ) {
        this.getColorTheme();
    }

    emitWindowRef() {
        this.windowSubject.next(this.windowRef);
    }


    

    setObjectWindowRef(windowRef: WindowReference) {
        this.windowRef.isMobile = windowRef.ANDROID || windowRef.IOS ||  windowRef.width < 600;
        this.windowRef.headerMobile = windowRef.width < 990 ;
        this.windowRef.contentMobile = windowRef.width < 600;
        this.emitWindowRef();
    }


    setColorTheme(colorTheme: string ,textColor: string){
        this.storageLocalService.setColorTheme(colorTheme,textColor)
        this.windowRef.colorText = textColor;
        this.windowRef.colorTheme = colorTheme;
        this.emitWindowRef();
    }


    getColorTheme(){
        const { colorTheme , textColor } = this.storageLocalService.getColorTheme();
        if( colorTheme !== undefined && textColor !== undefined ){
            this.windowRef.colorText = textColor;
            this.windowRef.colorTheme = colorTheme;
            this.emitWindowRef();
        }else{
            this.setDefaultColorTheme();
        }
    }


    setDefaultColorTheme(){
        this.setColorTheme('#34495E','#ffffff');
    }


   



}