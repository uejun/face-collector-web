import {Component, OnInit, ViewChild} from '@angular/core';
import {WebcamComponent} from '../webcam/webcam.component';
import {Image} from '../entity/image';
import {PhotoService} from '../service/photo.service';
import {StimulusComponent} from '../stimulus/stimulus.component';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

    @ViewChild(StimulusComponent) private stimulusComp: StimulusComponent;
    @ViewChild(WebcamComponent) private webcamComp: WebcamComponent;

    private _data: any;

    private _uid = '';

    private takePhotoTouched = false;

    constructor(private photoService: PhotoService, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        setTimeout(() => this.webcamComp.playCamera(), 1000);

        this._uid = this.authService.getUID();
        if (this._uid === '') {
           console.log('uid is empty');
        }
    }

    takePhoto() {
        this._data = this.webcamComp.takePhoto();
        this.webcamComp.pause();
        this.takePhotoTouched = true;
    }

    cancel() {
        this.webcamComp.start();
    }

    postPhoto() {
        const image = new Image(this._data);

        const stimulus_id = this.stimulusComp.getCurrentStimulusID();
        const label = this.stimulusComp.getCurrentStimulusLabel();


        this.photoService.postImage(image, this._uid, stimulus_id.toString(), label)
            .then( r => {
                if (this.stimulusComp.hasNext()) {
                    this.takePhotoTouched = false;
                    this.stimulusComp.next();
                    this.webcamComp.start();
                } else {
                    console.log('done.');
                    this.router.navigate(['/finish']);
                }
            });
    }

}
