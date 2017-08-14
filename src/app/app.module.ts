import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StimulusComponent } from './stimulus/stimulus.component';
import {StimulusService} from './stimulus/stimulus.service';
import {HttpModule} from '@angular/http';
import { RouterModule } from '@angular/router';

import {MdButtonModule, MdCardModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdProgressBarModule} from '@angular/material';

import { WebcamComponent } from './webcam/webcam.component';
import { WorkComponent } from './work/work.component';
import {PhotoService} from './service/photo.service';
import { SignupComponent } from './signup/signup.component';

import { AngularFireModule } from 'angularfire2';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {AuthService} from './auth/auth.service';
import { SigninComponent } from './signin/signin.component';
import {AuthGuardService} from './auth/auth-guard.service';
import { FinishComponent } from './finish/finish.component';

export const firebaseConfig = {
    apiKey: 'AIzaSyBwJi9QRys8HRzZehaIH1eK70CeMV8TN70',
    authDomain: 'face-collector.firebaseapp.com',
    databaseURL: 'https://face-collector.firebaseio.com',
    projectId: 'face-collector',
    storageBucket: '',
    messagingSenderId: '1069562159976'
};

@NgModule({
  declarations: [
    AppComponent,
    StimulusComponent,
    WebcamComponent,
    WorkComponent,
    SignupComponent,
    HeaderComponent,
    SigninComponent,
    FinishComponent,
  ],
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpModule,
      MdCardModule,
      MdInputModule,
      MdToolbarModule,
      MdProgressBarModule,
      BrowserAnimationsModule,
      MdButtonModule,
      RouterModule.forRoot([
          {
              path: '',
              redirectTo: 'signin',
              pathMatch: 'full'
          },
          {
              path: 'signup',
              component: SignupComponent
          },
          {
              path: 'signin',
              component: SigninComponent
          },
          {
              path: 'stimulus',
              component: StimulusComponent
          },
          {
              path: 'work',
              component: WorkComponent,
              canActivate: [AuthGuardService]
          },
          {
              path: 'finish',
              component: FinishComponent
          }

      ]),
      AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
      StimulusService,
      PhotoService,
      AuthService,
      AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
