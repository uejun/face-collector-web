import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signinForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService) {
        // this.user = afAuth.authState;
    }

    ngOnInit() {
        this.signinForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', [Validators.required]],
        });
    }

    onSubmit() {
        console.log(this.signinForm);
        const email = this.signinForm.value.email;
        const password = this.signinForm.value.password;

        this.authService.signinUser(email, password);
    }

}
