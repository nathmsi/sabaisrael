import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

import { User } from '../models/user.model'
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';

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
    level: ""
  };

  userSubject = new Subject<User>();

  constructor() {
  }

  connectFirebase() {
    return new Promise(
      async (resolve, reject) => {
        var firebaseConfig = environment.firebaseConfig;
        firebase.initializeApp(firebaseConfig)
        this.db = this.server.firestore();
        this.server.auth().onAuthStateChanged(
          (user) =>{
            if (user) {
              console.log(`%c user connected ${user.displayName} `, "color:yellow", user);
              this.isAuth(user.displayName, user.email, user.uid, true, user.photoURL || "", user.phoneNumber);
            }
            resolve(true);
          },
          (error) => reject(error)
        )
      }
    )
  }



  emitUser() {
    this.userSubject.next(this.user);
  }

  isAuth(displayName: string, email: string, uid: string, isAuth: boolean, photoURL: string, phone: string) {
    this.user = {
      name: displayName,
      email,
      uid,
      isAuth,
      photo: photoURL,
      phone,
      level: "client"
    };
    if (environment.emailManager.includes(email)) {
      this.user.level = 'manager';
    }
    this.emitUser();
  }


  

  setCurrentUser() {
    const currentUser = this.server.auth().currentUser;
    if (currentUser) {
      this.isAuth(currentUser.displayName, currentUser.email, currentUser.uid, true, currentUser.photoURL || "", currentUser.phoneNumber);
    }
  }

  createNewUser(email: string, password: string, username: string) {
    return new Promise(
      (resolve, reject) => {
        this.server.auth().createUserWithEmailAndPassword(email, password).then(
          (user) => {
            this.server.auth().currentUser.updateProfile({
              displayName: username,
            }).then(
              () => {
                this.setCurrentUser();
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
          (user) => {
            console.log("%c signInUser  ", "color:yellow", user);
            this.setCurrentUser();
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
      level: ""
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
            this.emitUser()
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
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


}