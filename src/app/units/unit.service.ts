import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Unit, deleteUnitFromArray } from './unit';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitService {
	private unitsUrl = 'http://localhost:3000/api/units';
	private unitUrl = 'http://localhost:3000/api/unit';

	public units: Unit[];

	constructor(private http: Http) {
		this.units = [];
	}

	getUnits(): Observable<Unit[]> {
		return this.http.get(this.unitsUrl)
						.map((res: Response) => {
							let units = this.extractData(res);
							this.units = units;
						})
						.catch(this.handleError);
	}

	addUnit(unit: Unit): Observable<Unit> {
		return this.http.post(this.unitUrl, unit)
						.map((res: Response) => {
							let unit = this.extractData(res);
							this.units.push(unit);
						})
						.catch(this.handleError);
	}

	deleteUnit(id: string) {
		if(!id) {
			return; //ERR
		}
		return this.http.delete(`${this.unitUrl}/${id}`)
						.map((res: Response) => {
							let unit_id = this.extractData(res);
							deleteUnitFromArray(this.units, unit_id);
							return unit_id;
						})
						.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body;
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
}