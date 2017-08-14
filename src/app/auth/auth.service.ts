import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    token: string = null;
    _user: any;

    public message: string = null;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
               response => {
                   this._user = firebase.auth().currentUser;
                   firebase.auth().currentUser.getToken()
                       .then(
                           (token: string) => this.token = token
                       );
                   this.router.navigate(['/work']);
               }
            )
            .catch(
                error => {
                    this.message = error.message;
                }
            );
  }

  signinUser(email: string, password: string) {
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
              response => {
                  this._user = firebase.auth().currentUser;
                  firebase.auth().currentUser.getToken()
                      .then(
                          (token: string) => this.token = token
                      );
                  this.router.navigate(['/work']);
              }
          )
          .catch(
              error => {
                  this.message = error.message;
              }
          );
  }

  isAuthenticated() {
      return this.token != null;
  }

  logout() {
      firebase.auth().signOut();
      this.token = null;
      this._user = null;
  }

  getUID() {
      if (this._user == null) {
          this.router.navigate(['/']);
      }
      return this._user.uid;
  }

}
