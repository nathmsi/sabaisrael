import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
@Injectable()
export class AuthGuardService implements CanActivate {


    userSubscription: Subscription;
    isAuth: boolean = false;

    constructor(private router: Router, private authService: AuthService) { 
        this.userSubscription = this.authService.userSubject.subscribe(
            (user: User) => {
                if (user.level === 'manager') {
                    this.isAuth = true
                } else {
                    this.isAuth = false;
                }
            }
        );
        this.authService.emitUser();
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                if(this.isAuth){
                    resolve(true);
                }else{
                    this.router.navigate(['/']);
                    reject(false);
                }
            }
          );
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }


}