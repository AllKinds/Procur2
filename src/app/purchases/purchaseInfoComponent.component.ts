import { Component, OpaqueToken, Inject } from '@angular/core';
import { Purchase } from '../models/purchase'; 

export const PURCHASE_PROPS = new OpaqueToken('tmp value');

@Component({
	selector: 'purchase-info',
	templateUrl: 'purchaseInfoComponent.component.html'
})
export class PurchaseInfoComponent {
	public purchase: Purchase;
	public enableAddYear: boolean = false;

	public newYear:string;
	public newAmount:string;

	constructor( @Inject(PURCHASE_PROPS) purchase: Purchase ) {
		this.purchase = purchase;
	}

	toggleAddYear() {
		console.log('Do this');
		this.enableAddYear = true;
	}

	newAmountOfYearIsValid():boolean {
		return (
			this.newYear != "" &&
			this.newAmount != "" &&
			this.newYear != undefined &&
			this.newAmount != undefined
			);

		// CHANGE THAT!!
	}

	addYear() {
		this.purchase.amounts.push({year:parseInt(this.newYear), amount: parseInt(this.newAmount)});
		this.newYear = "";
		this.newAmount = "";
		this.enableAddYear = false;
	}
}