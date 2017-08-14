import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
      firebase.initializeApp({
          apiKey: 'AIzaSyBwJi9QRys8HRzZehaIH1eK70CeMV8TN70',
          authDomain: 'face-collector.firebaseapp.com',
          projectId: 'face-collector',
      });
  }
}
