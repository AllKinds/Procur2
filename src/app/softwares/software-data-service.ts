import { Injectable } 		from '@angular/core';
import { Http, Response, Headers, RequestOptions } 	from '@angular/http';

import { Software, deleteSoftwareFromArray } 		from './software';
import { Observable } 		from 'rxjs/Observable';


@Injectable()
export class SoftwareDataService {
	private softwaresUrl = 'http://localhost:3000/api/softwares'  // URL to web API
	private softwareUrl = 'http://localhost:3000/api/software'  // URL to web API

	public softwares: Software[];

	constructor(private http: Http) {
		this.softwares = [];
	}

	getSoftwares(): Observable<Software[]>{
		return this.http.get(this.softwaresUrl)
		                .map((res:Response) => {
		                	let softs = this.extractData(res);
		                	this.softwares = softs;
		                	return softs;
		                })
		                .catch(this.handleError);
	}
	private extractData(res: Response) {
		let body = res.json();
		return body;
	}

	private postData(res:Response) {
		let soft = res.json();
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
	                    .map((res:Response) => {
	                    	let soft = this.extractData(res);
	                    	this.softwares.push(soft);
	                    	return soft;
	                    })
	                    .catch(this.handleError);
  	}

  	deleteSoftware(id: string) {
  		if(!id){
  			return;
  		}
  		return this.http.delete(`${this.softwareUrl}/${id}`)
  						.map((res:Response) => {
	                    	let soft_id = this.extractData(res);
	                    	deleteSoftwareFromArray(this.softwares, soft_id);
	                    	return soft_id;
	                    })
  						.catch(this.handleError);
  	}


  	
}