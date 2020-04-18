import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowReference } from '../models/windowRef.model';
import { WindowRef } from '../services/windowRef.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  fileIsUploading = false;
  dataReceive: boolean = false;
  fileUrl: string;
  fileUploaded = false;
  user: User = {
    name: 'default',
    email: '',
    uid: "",
    isAuth: false,
    photo: "",
    phone: "",
    level: ""
  };
  userSubscription: Subscription;
  fileDetected: File = null;
  imageLoader: boolean = true;
  windowRef: WindowReference;
  SubscriptionRefWindow: Subscription;
  
  constructor(
     private authService: AuthService,
     private _snackBar: MatSnackBar,
     private windowRefer: WindowRef,
     ) {

    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        console.log("%c Account component ", "color: orange", user);
        this.user = user;
        this.dataReceive = true
      }
    );
    this.authService.emitUser();

    this.SubscriptionRefWindow = this.windowRefer.windowSubject.subscribe(
      (windowRefer: WindowReference) => {
        this.windowRef = windowRefer;
      }
    )

    this.windowRefer.emitWindowRef();
  }

  ngOnInit(): void {
  }

  

  detectFiles(event) {
    this.fileDetected = event.target.files[0]
  }

  saveImage() {
    return new Promise(
      (resolve, reject) => {
        if (this.fileDetected !== null) {
          this.dataReceive = false;
          this.fileIsUploading = true;
          this.authService.uploadFile(this.fileDetected).then(
            (url: string) => {
              this.user.photo !== "" && this.authService.deleteLastPhoto(this.user.photo)
              this.authService.savePhotoToUser(url);
              this.fileUrl = url;
              this.fileIsUploading = false;
              this.fileUploaded = true;
              this._snackBar.open('upload file success', 'close');
              resolve();
            },
            (error) => {
              this._snackBar.open('upload file error', 'close');
              resolve();
            }
          );
        } else {
          resolve();
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    this.dataReceive = false;
    this.authService.saveUser(form.value['username'], "").then(
      () => {
        this.saveImage().then(
          () => {
            this.dataReceive = true
            this._snackBar.open('user saved', 'close');
          }
        )
      },
      (error) => {
        this._snackBar.open('saved error', 'close', );
      }
    )
  }

  setColorTheme(colorTheme: string ,textColor: string){
    this.windowRefer.setColorTheme(colorTheme,textColor);
  }


  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
