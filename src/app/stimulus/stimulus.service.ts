import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Stimulus} from './stimulus';
import 'rxjs/Rx';

@Injectable()
export class StimulusService {

    private endpoint = 'https://xtpuoxvzq9.execute-api.ap-northeast-1.amazonaws.com/prd/rest-stimuli';

    public totalCount = 0;
    public startCurrentCount = 0;

    constructor(private http: Http) { }

    getStimuli(userId: string): Promise<Stimulus[]> {
        return this.http.get(this.endpoint + '/' + userId)
            .toPromise()
            .then((response: Response) => {
                const obj = response.json();
                this.totalCount = obj.total_count;
                this.startCurrentCount = obj.current_count;
                return obj.stimuli as Stimulus[];
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
