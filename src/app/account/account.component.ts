import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/Authentication/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowReference } from '../models/windowRef.model';
import { WindowRef } from '../services/windowRef.service';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

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
    level: "",
    token: "",
    photoUrl: ""
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
    private dialog: MatDialog,
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
        this._snackBar.open('saved error', 'close');
      }
    )
  }

  setColorTheme(colorTheme: string, textColor: string) {
    this.windowRefer.setColorTheme(colorTheme, textColor);
  }

  resetPassword() {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      maxWidth: "400px",
      data: "Do you confirm to reset your password , we sent you email to : " + this.user.email +
      ' to change to new password .'
    });
    dialogRef.afterClosed().subscribe(result => {
      result && this.authService.resetPassword().then(
        () => {
          this._snackBar.open('check your email message , we sent you password reset form', 'close');
        },
        (error) => {
          this._snackBar.open('problem to reset your password', 'close');
        }
      )
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
