import {Component, OnInit, ViewChild} from '@angular/core';
import {StimulusService} from './stimulus.service';
import 'rxjs/Rx';
import {Stimulus} from './stimulus';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-stimulus',
  templateUrl: './stimulus.component.html',
  styleUrls: ['./stimulus.component.css']
})
export class StimulusComponent implements OnInit {

    private stimuli: Stimulus[];
    private currentStimulus: Stimulus;
    private _index = 0;

    // 表示用
    private emotion = '困惑'; // or "ニュートラル"
    private currentCount = 0;
    private totalCount = 0;

    constructor(private stimulusService: StimulusService, private authService: AuthService) { }

    ngOnInit() {
        this.getStimuli();
    }

  getStimuli() {
       const userId = this.authService.getUID();
      this.stimulusService.getStimuli(userId)
          .then(
              stimuli => {
                  this.stimuli = stimuli;
                  this.currentStimulus = this.stimuli[0];
                  this.currentCount = this.stimulusService.startCurrentCount;
                  console.log(this.currentCount);
                  this.totalCount = this.stimulusService.totalCount;
              }
          );
  }

  getCurrentStimulusID(): string {
        return this.currentStimulus.stimulus_id.toString();
  }

  getCurrentStimulusLabel(): string {
      return this.currentStimulus.label.toString();
    }

  next() {
        this._index += 1;
        this.currentStimulus = this.stimuli[this._index];

        // 表示用
        this.emotion = this._getEmotion(this.currentStimulus.label);
        this.currentCount += 1;
  }

  _getEmotion(label: string) {
       switch (label) {
           case 'confused':
               return '困惑';
           case 'neutral':
               return '無表情';
           case 'smile':
               return '微笑み';
           default:
               return '無表情';
       }
  }

  hasNext() {
        return this._index + 1 < this.stimuli.length;
  }

}
