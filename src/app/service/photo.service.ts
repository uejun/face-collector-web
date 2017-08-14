import { Injectable } from '@angular/core';
import {Image} from '../entity/image';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class PhotoService {

    ENDPOINT = 'https://xtpuoxvzq9.execute-api.ap-northeast-1.amazonaws.com/prd/photo';
    // ENDPOINT = 'http://localhost:5080/photo';

    constructor(private http: Http) { }

    postImage(image: Image, user_id: string, stimulus_id: string, label: string) {
        const headers = new Headers({'Content-Type': image.getContentType()});
        const options = new RequestOptions();
        options.headers = headers;

        const url = this.ENDPOINT + '/' + user_id + '/' + stimulus_id + '/' + label;

        // Remove "data: image/jpeg; base64, "
        const data = image.data.replace(/^.*,/, '');

        return this.http.post(url, data, options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
