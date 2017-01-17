import { Component } 		   from '@angular/core';
import { Purchase, totalAmount, totalAmountOfYears, purchasedForYear }   		   from './purchase';
// import { Unit } from '../units/unit';
// import { PurchaseDataService } from '../data/purchase-data-service';
import { PurchaseService } 	from './purchase.service';
import { AuthService } 		from '../auth.service';
import { User }				from '../users/user';

import {
	MdlDialogService,
	MdlDialogReference
} from 'angular2-mdl';

import {
	PurchaseInfoComponent,
	PURCHASE_PROPS
} from './purchaseInfoComponent.component'

@Component ({
	selector: 'purchases-tab',
	templateUrl: 'purchases.component.html',
	styleUrls: ['purchases.component.css']
})

export class Purchases {
	private purchases;
	searchInput = "";
	filterUnitInput = "";
	filterYearInput = "";
	public calcTotalAmount = totalAmountOfYears;
	yearRange = {
		from: 	0,
		to: 	2050
	}
	public erroMsg: string;
	advancedSearch = false;
	advancedFilter = false;
	user: User;

	constructor(
		private purchaseService: 	PurchaseService,
		private userService: 		AuthService,
		private dialogService: 		MdlDialogService,
	) {}

	public ngOnInit() {
		this.user = this.userService.user;
		this.getPurchases();	  
	}

	getMyUser() {
		this.userService.getUser()
						.subscribe(
							user => this.user = user,
							error => this.erroMsg = <any>error
						);
	}

	getPurchases() {
		if(!this.user){
			this.getMyUser();
		}
		if(['Admin', 'Manager'].indexOf(this.user.permission) > -1){
			this.purchaseService.getPurchases()
								.subscribe(
									purchases 	=> this.purchases = purchases,
									error 		=> this.erroMsg = <any>error);
		}
		else if(this.user.permission == 'Unit'){
			this.purchaseService.getPurchasesByUnit(this.user.unitId)
								.subscribe(
									purchases 	=> this.purchases = purchases,
									error 		=> this.erroMsg = <any>error);
		}
	}

	validOnSearch(purchase: Purchase): boolean {
		if(!this.filterYearInput) {
			this.yearRange = {
				from: 	0,
				to: 	2050
			}
		}
		if(this.advancedFilter && (this.filterYearInput || this.filterUnitInput)) {
			let isValid = true;
			if(this.filterUnitInput){
				isValid = isValid && (purchase.unit.unitId == this.filterUnitInput);
			}
			if(this.filterYearInput){
				isValid = isValid && purchasedForYear(purchase, parseInt(this.filterYearInput));
			}
			return isValid;
		}

		if(this.searchInput) {
			let valueString  = concatObjVals(purchase, false);
			return valueString.includes(this.searchInput.toLowerCase());
		}
		return true;
		// return (!this.searchInput) ||
		//  // purchase.softwareId.toString().includes(	this.searchInput.toLowerCase() ) ||
		//  purchase.unit.unitId.toString().includes(		this.searchInput.toLowerCase() ) ||
		//  purchase.unit.subUnit.toLowerCase().includes(	this.searchInput.toLowerCase() );
	}

	showPurchaseInfo($event, index, purchase: Purchase) {
		let pDialog = this.dialogService.showCustomDialog({
			component: PurchaseInfoComponent,
			providers: [{provide: PURCHASE_PROPS, useValue: purchase}],
			styles: {'width': '500px', 'overflow-y': 'auto', 'max-height': '90%'},
			isModal: true,
			clickOutsideToClose: true,
		})
		pDialog.subscribe( (dialogReference: MdlDialogReference) => {
			console.log('info dialog is visible', dialogReference );
		});
	}
	tempAddPurchase(){
		let purchase = new Purchase(
			"586a0877aeb9d22d00d973b4",
			"586c9d4ea31bdc0957621782",
			[]
		);
		this.addPurchase(purchase);
	}
	addPurchase(purchase: Purchase){
		this.purchaseService.addPurchase(purchase)
			.subscribe(
				purchase => {
					console.log('Added: '+purchase);
				},
				error    => console.log("Error: "+<any>error)
			);
	}

	toggleAdvSrc(): void {
		if(!this.advancedSearch) {
			this.searchInput = "";
			this.calcTotalAmount = totalAmountOfYears
		}
		else {
			this.filterUnitInput = "";
			this.filterYearInput = "";
			this.yearRange = {
				from: 	0,
				to:		2050
			}
			this.advancedFilter = false;
		}
		this.advancedSearch = !this.advancedSearch;
		
	}

	filterAdv(): void {
		if(this.filterYearInput) {
			this.yearRange = {
				from: 	parseInt(this.filterYearInput),
				to:		parseInt(this.filterYearInput)
			}
		}
		
		this.advancedFilter = true;
	}
}

function concatObjVals(obj, withPrivate) {
	let valueString = '';
	for(let key in obj) {
		if(key[0] == '_' && !withPrivate){
			continue;
		}
		if(typeof(obj[key]) == "object"){
			valueString += concatObjVals(obj[key], withPrivate);
		} else {
			valueString += obj[key] + "; ";
		}
	}
	return valueString;
}