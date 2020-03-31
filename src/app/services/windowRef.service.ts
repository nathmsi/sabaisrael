import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { WindowReference } from '../models/windowRef.model';


@Injectable()
export class WindowRef {
    windowRef: WindowReference = new WindowReference(false);
    windowSubject = new Subject<WindowReference>();

    constructor() {
    }

    emitWindowRef() {
        this.windowSubject.next(this.windowRef);
    }


    

    setObjectWindowRef(windowRef: WindowReference) {
        windowRef.isMobile = windowRef.ANDROID || windowRef.IOS;
        windowRef.headerMobile = windowRef.width < 990 ;
        windowRef.contentMobile = windowRef.width < 600;
        this.windowRef = windowRef;
        this.emitWindowRef();
    }



}