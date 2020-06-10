import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

import { User } from '../../models/user.model'
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { httpClientCrudService } from './httpService.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  server = firebase;
  db: any;

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

  userSubject = new Subject<User>();

  constructor(
    private httpClient: HttpClient
  ) {
  }


  getToken() {
    return this.user.token;
  }

  connectFirebase() {
    return new Promise(
      async (resolve, reject) => {
        var firebaseConfig = environment.firebaseConfig;
        firebase.initializeApp(firebaseConfig)
        this.db = this.server.firestore();
        this.server.auth().onAuthStateChanged(
          (user) => {
            console.log('user', user);
            if (user === null) {
              resolve(true);
            }
            if (user) {
              firebase.auth().currentUser.getIdToken(true).then(
                (token) => {
                  console.log(`%c user connected ${user.displayName} `, "color:yellow", user);
                  this.isAuth(user.displayName, user.email, user.uid, true, user.photoURL || "", user.phoneNumber, token);
                  resolve(true);
                }
              );
            }
            //resolve(true);
          },
          (error) => reject(error)
        )
      }
    )
  }



  emitUser() {
    this.userSubject.next(this.user);
  }

  isAuth(displayName: string, email: string, uid: string, isAuth: boolean, photoURL: string, phone: string, token: string) {
    this.user = {
      name: displayName,
      email,
      uid,
      isAuth,
      photo: photoURL,
      phone,
      token,
      level: "client",
      photoUrl: photoURL
    };
    if (environment.emailManager.includes(email)) {
      this.user.level = 'manager';
    }
    this.emitUser();
  }




  setCurrentUser() {
    return new Promise(
      (resolve, reject) => {
        const user = this.server.auth().currentUser;
        if (user) {
          firebase.auth().currentUser.getIdToken(true).then(
            (token) => {
              console.log(`%c user connected ${user.displayName} `, "color:yellow", user);
              this.isAuth(user.displayName, user.email, user.uid, true, user.photoURL || "", user.phoneNumber, token);
              resolve();
            },
            (error) => {
              console.log(error);
              reject(error);
            }
          );
        }
      }
    )

  }

  createNewUser(email: string, password: string, username: string) {
    return new Promise(
      (resolve, reject) => {
        this.server.auth().createUserWithEmailAndPassword(email, password).then(
          (user) => {
            this.server.auth().currentUser.updateProfile({
              displayName: username,
            }).then(
              async () => {
                await this.setCurrentUser();
                await this.saveUserToServer();
                console.log("%c createNewUser => ", "color:yellow", user);
                resolve();
              },
              (error) => {
                console.log(error);
                reject(error);
              }
            )
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        )
      }
    )
  }


  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.server.auth().signInWithEmailAndPassword(email, password).then(
          async (user) => {
            console.log("%c signInUser  ", "color:yellow", user);
            await this.setCurrentUser();
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  signOutUser() {
    this.user = {
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
    this.server.auth().signOut();
    this.emitUser();
    console.log("%c signOutUser  ", "color:yellow");
  }

  getAuth() {
    this.server.auth;
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = this.user.uid + new Date();
        const upload = firebase.storage().ref()
          .child('images/user/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("%c Chargement… ", "color:yellow");
          },
          (error) => {
            console.log("%c Erreur Chargement… ==> ", "color:yellow", error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  savePhotoToUser(url: string) {
    return new Promise(
      (resolve, reject) => {
        this.user.photo = url;
        this.server.auth().currentUser.updateProfile({
          photoURL: url
        }).then(
          () => {
            console.log("%c savePhotoToUser  ", "color:yellow", url);
            this.emitUser();
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }


  saveUser(username: string, phone: string) {
    return new Promise(
      (resolve, reject) => {
        this.server.auth().currentUser.updateProfile({
          displayName: username
        }).then(
          () => {
            console.log("%c saveUser  ", "color:yellow", username);
            this.user.name = username;
            this.emitUser();
            this.saveUserToServer().then(
              () => {
                resolve();
              },
              (error) => {
                console.log(error);
                reject();
              }
            )
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        )
      }
    )
  }

  saveUserToServer() {
    const header = {
      //responseType: 'text' as 'json',
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.user.token}`)
        .set('responseType', '')
    }
    return new Promise(
      (resolve, reject) => {
        this.httpClient.put('https://us-central1-saba-israel.cloudfunctions.net/webApi/api/v1/' + 'users' + '/' + this.user.uid
          , {
            displayName: this.user.name,
            email: this.user.email,
            uid: this.user.uid,
            photoUrl: this.user.photo
          }, header).subscribe({
            next: data => resolve(data),
            error: error => reject(error.error)
          })
      }
    )
  }

  deleteLastPhoto(photo: string) {
    return new Promise(
      (resolve, reject) => {
        const storageRef = firebase.storage().refFromURL(photo);
        storageRef.delete().then(
          () => {
            console.log("%c Last  Photo removed! ", "color:yellow");
            resolve();
          },
          (error) => {
            console.log("%c Photo removed error ==> ", "color:red", error);
            reject(error);
          }
        );
      }
    )
  }

  resetPassword() {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(this.user.email).then(function (data) {
          console.log(data);
          resolve();
        }).catch(function (error) {
          console.log(error);
          reject();
        });
      })
  }


}