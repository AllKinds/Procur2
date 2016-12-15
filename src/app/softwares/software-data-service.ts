import { Injectable } 		from '@angular/core';
import { Http, Response, Headers, RequestOptions } 	from '@angular/http';

import { Software } 		from './software';
import { Observable } 		from 'rxjs/Observable';


@Injectable()
export class SoftwareDataService {
	private softwaresUrl = 'http://localhost:3000/api/softwares'  // URL to web API
	private softwareUrl = 'http://localhost:3000/api/software'  // URL to web API

	constructor(private http: Http) {}

	getSoftwares(): Observable<Software[]>{
		return this.http.get(this.softwaresUrl)
		                .map(this.extractData)
		                .catch(this.handleError);
	}
	private extractData(res: Response) {
		let elements = res.json();
		let softwares: Software[] = [];
		for(let element of elements) {
			let soft = new Software(
				element.softwareId,
				element.softwareName,
				element.publisherName,
				element.licenceCost,
				element._id
				);
			softwares.push(soft);
		}
		return softwares;
		// return body.data || { };
	}

	private postData(res:Response) {
		let data = res.json();
		let soft = new Software(
			data.softwareId,
			data.softwareName,
			data.publisherName,
			data.licenceCost,
			data._id
		);
		return soft;
	}

	private handleError (error: Response | any) {
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;
	if (error instanceof Response) {
	  const body = error.json() || '';
	  const err = body.error || JSON.stringify(body);
	  errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	} else {
	  errMsg = error.message ? error.message : error.toString();
	}
	console.error(errMsg);
	return Observable.throw(errMsg);
	}

	addSoftware (software: Software): Observable<Software> {
	    let headers = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: headers });

	    return this.http.post(this.softwareUrl, software)
	                    .map(this.postData)
	                    .catch(this.handleError);
  	}
}