import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Purchase, totalAmount, deletePurchaseFromArray } from './purchase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PurchaseService {
	private purchasesUrl = 'http://localhost:3000/api/purchases';
	private purchaseUrl = 'http://localhost:3000/api/purchase';

	public purchases: Purchase[];

	constructor(private http: Http) {
		this.purchases = [];
	}

	getPurchases(): Observable<Purchase[]> {
		return this.http.get(this.purchasesUrl)
						.map((res: Response) => {
							let prcs = this.extractData(res);
							this.purchases = prcs;
						})
						.catch(this.handleError);
	}

	addPurchase(purchase: Purchase): Observable<Purchase> {
		return this.http.post(this.purchaseUrl, purchase)
						.map((res: Response) => {
							let prc = this.extractData(res);
							this.purchases.push(prc);
						})
						.catch(this.handleError);
	}

	deletePurchase(id: string) {
		if(!id) {
			return; //ERR
		}
		return this.http.delete(`${this.purchaseUrl}/${id}`)
						.map((res: Response) => {
							let prc_id = this.extractData(res);
							deletePurchaseFromArray(this.purchases, prc_id);
						})
						.catch(this.handleError);
	}
	checkThis () {
		let purchaseId = "585a72d3b3b63b65ea7bc6f3";
		let yearlyAmount = {"year": 1, "amount": 1};
		return this.http.put(`${this.purchaseUrl}/${purchaseId}/newYear`, yearlyAmount)
						.map((res: Response) => {
							console.log("Year Added");
							let purchase = this.extractData(res);
							this.purchases.push(purchase);
						})
						.catch(this.handleError);
	}
	purchaseAddYear(purchaseId: string, year: number, amount: number){
		// purchaseId = "585a72d3b3b63b65ea7bc6f3";
		let yearlyAmount = {"year": year, "amount": amount};
		return this.http.put(`${this.purchaseUrl}/${purchaseId}/newYear`, {"amountByYear": yearlyAmount})
						.map((res: Response) => {
							console.log("Year Added");
							let purchase = this.extractData(res);
							this.purchases.push(purchase);
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