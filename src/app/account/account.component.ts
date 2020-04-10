import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        console.log("%c Account component ", "color: orange", user);
        this.user = user;
        this.dataReceive = true
      }
    );
    this.authService.emitUser();
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
              this._snackBar.open('upload file success', 'close', {
                duration: 2000,
                horizontalPosition: 'right',
                panelClass: 'snack-error'
              });
              resolve();
            },
            (error) => {
              this._snackBar.open('upload file error', 'close', {
                duration: 2000,
                horizontalPosition: 'right',
                panelClass: 'snack-error'
              });
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
            this._snackBar.open('user saved', 'close', {
              duration: 2000,
              horizontalPosition: 'right',
              panelClass: 'snack-error'
            });
          }
        )
      },
      (error) => {
        this._snackBar.open('saved error', 'close', {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: 'snack-error'
        });
      }
    )
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }



}
