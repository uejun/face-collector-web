import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;

    constructor(private formBuilder: FormBuilder, public authService: AuthService) {
        // this.user = afAuth.authState;

    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
           'userName': ['', [Validators.required]],
           'email': ['', [Validators.required, Validators.email]],
           'password': ['', [Validators.required]],
           'confirmPassword': ['', [Validators.required, this.isEqualPassword.bind(this)]]
       });

    }

    onSubmit() {
        console.log(this.signupForm);
        const userName = this.signupForm.value.userName;
        const email = this.signupForm.value.email;
        const password = this.signupForm.value.password;

        this.authService.signupUser(email, password);
    }

    // login() {
    //     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // }
    //
    // logout() {
    //     this.afAuth.auth.signOut();
    // }

    isEqualPassword(control: FormControl): {[s: string]: boolean} {
        if (!this.signupForm) {
            return {passwordsNotMatch: true};
        }
        if (control.value !== this.signupForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
        return null;
    }

}
