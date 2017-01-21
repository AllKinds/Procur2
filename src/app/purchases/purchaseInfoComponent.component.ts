import { Component, OpaqueToken, Inject } from '@angular/core';
import { Purchase, deletePurchaseFromArray } from './purchase';
import { User }				from '../users/user';
import { PurchaseService } from './purchase.service';
import { AuthService } 		from '../auth.service';
import { MdlDialogReference } from 'angular2-mdl';

export const PURCHASE_PROPS = new OpaqueToken('tmp value');

@Component({
	selector: 'purchase-info',
	styleUrls: ['purchaseInfoComponent.component.css'],
	templateUrl: 'purchaseInfoComponent.component.html'
})
export class PurchaseInfoComponent {
	public purchase: Purchase;
	public enableAddYear: boolean = false;

	public newYear:string;
	public newAmount:string;

	showYears = false;
	user: User;

	constructor( 
		private dialog: MdlDialogReference,
		private purchaseDataService: PurchaseService,
		private userService: 		AuthService,
		@Inject(PURCHASE_PROPS) purchase: Purchase 
	) {
		this.purchase = purchase;
	}

	public ngOnInit() {
		this.user = this.userService.user;
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

		this.purchaseDataService.purchaseAddYear(this.purchase._id, parseInt(this.newYear), parseInt(this.newAmount))
								.subscribe(
									res => console.log(res),
									err => console.log("Err: "+err)
								);

		this.newYear = "";
		this.newAmount = "";
		this.enableAddYear = false;
	}

	deletePurchase(purchase: Purchase) {
		this.purchaseDataService.deletePurchase(purchase._id)
								.subscribe(
									purchase => {console.log("Deleted"); this.dialog.hide()},
									error => console.log("Error: "+<any>error)
								);
	}

	calcPurchaseTotalAmount(purchase: Purchase): number {
		let sum = 0;
		for(let afy of purchase.amounts) {
			sum += afy.amount;
		}
		return sum;
	}
}