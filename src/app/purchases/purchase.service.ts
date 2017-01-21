import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Purchase, totalAmount, deletePurchaseFromArray, updatePurchaseFromArray, totalCostForYears } from './purchase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PurchaseService {
	private purchasesUrl = 'http://localhost:3000/api/purchases';
	private purchaseUrl = 'http://localhost:3000/api/purchase';

	public purchases: Purchase[];
	public totalCosts = {};
	public totalCostSum: number;

	yearRange = {
		from: 	0,
		to: 	2050
	}

	constructor(private http: Http) {
		this.purchases = [];
	}

	getPurchases(): Observable<Purchase[]> {
		return this.http.get(this.purchasesUrl)
						.map((res: Response) => {
							let prcs = this.extractData(res);
							this.updateTotalCost(prcs);
							this.purchases = prcs;
						})
						.catch(this.handleError);
	}

	getPurchasesWithFilter(filter: string): Observable<Purchase[]> {
		if(!filter){
			return this.getPurchases();
		}
		return this.http.get(this.purchasesUrl+'/search/'+filter)
						.map((res: Response) => {
							let prcs = this.extractData(res);
							this.updateTotalCost(prcs);
							this.purchases = prcs;
						})
						.catch(this.handleError);
	}

	advFilter(year: number, unitName: string): Observable<Purchase[]> {
		if(year) {
			this.yearRange = {
				from: 	year,
				to: 	year
			}
		} else {
			this.yearRange = {
				from: 	0,
				to: 	2050
			}
		}

		if(unitName) {
			return this.getPurchasesByUnitName(unitName);
		} 
		
		return this.getPurchases();

	}



	getPurchasesByUnit(unit_id: string): Observable<Purchase[]> {
		return this.http.get(this.purchasesUrl+'/byUnit/'+unit_id)
						.map((res: Response) => {
							let prcs = this.extractData(res);
							this.purchases = prcs;
						})
						.catch(this.handleError);
	}

	getPurchasesByUnitName(unitName: string): Observable<Purchase[]> {
		return this.http.get(this.purchasesUrl+'/byUnitName/'+unitName)
						.map((res: Response) => {
							let prcs = this.extractData(res);
							this.updateTotalCost(prcs);
							this.purchases = prcs;
						})
						.catch(this.handleError);
	}

	addPurchase(purchase: Purchase): Observable<Purchase> {
		return this.http.post(this.purchaseUrl, purchase)
						.map((res: Response) => {
							let prc = this.extractData(res);
							this.updateOneTotalCost(prc);
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
							this.updateDeleted(prc_id);
							deletePurchaseFromArray(this.purchases, prc_id);
						})
						.catch(this.handleError);
	}

	deletePurchasesBySoftware(software_id: string) {
		return this.http.delete(`${this.purchasesUrl}/bySoftware/${software_id}`)
						.map((res: Response) => {
							let statuse = this.extractData(res);
							console.log(status);
						})
						.catch(this.handleError);
	}

	deletePurchasesByUnit(unit_id: string){
		return this.http.delete(`${this.purchasesUrl}/byUnit/${unit_id}`)
						.map((res: Response) => {
							let statuse = this.extractData(res);
							console.log(status);
						})
						.catch(this.handleError);
	}

	purchaseAddYear(purchaseId: string, year: number, amount: number){
		// purchaseId = "585a72d3b3b63b65ea7bc6f3";
		let yearlyAmount = {"year": year, "amount": amount};
		return this.http.put(`${this.purchaseUrl}/${purchaseId}/newYear`, {"amountByYear": yearlyAmount})
						.map((res: Response) => {
							console.log("Year Added");
							let updatedPurchase = this.extractData(res);
							updatePurchaseFromArray(this.purchases, purchaseId, updatedPurchase);
							this.updateOneTotalCost(updatedPurchase);
						})
						.catch(this.handleError);
	}

	updateTotalCost(purchases: Purchase[]){
		if(!purchases){return};
		this.totalCostSum = 0;
		for(let i=0; i<purchases.length; i++){
			let purchase = purchases[i];
			let totalCost = this.calcTotalCost(purchase);
			this.totalCosts[`${purchase._id}`] = totalCost;
			this.totalCostSum += totalCost;
		}
	}

	updateDeleted(purchaseId: number) {
		for (let i=0; i<this.purchases.length; i++){
			if(this.purchases[i]._id == purchaseId){
				this.updateOneTotalCost(this.purchases[i], true);
			}
		}
	}

	updateOneTotalCost(purchase: Purchase, deleted?: boolean){
		if(!purchase){return};
		let totalCost = this.calcTotalCost(purchase);
		if(deleted) {
			// delete
			this.totalCostSum -= totalCost;
			this.totalCosts[purchase._id] = undefined;
			return;
		}
		else if(this.totalCosts[purchase._id]){
			// update
			this.totalCostSum -= this.totalCosts[purchase._id];
		}
		this.totalCosts[purchase._id] = totalCost;
		this.totalCostSum += totalCost;
	}

	calcTotalCost(purchase: Purchase) {
		return totalCostForYears(purchase, this.yearRange.from, this.yearRange.to);
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