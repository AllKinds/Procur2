import { Component } 		   from '@angular/core';
import { Purchase, totalAmount, totalAmountOfYears, purchasedForYear, totalCostForYears }   		   from './purchase';
// import { Unit } from '../units/unit';
// import { PurchaseDataService } from '../data/purchase-data-service';
import { PurchaseService } 	from './purchase.service';
import { AuthService } 		from '../auth.service';
import { User }				from '../users/user';
import { FormControl } 		from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

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
	searchControl = new FormControl();
	private purchases;
	searchInput = "";
	filterUnitInput = "";
	filterYearInput = "";
	public calcTotalAmount = totalAmountOfYears;
	totalSumCost: number;
	yearRange = {
		from: 	0,
		to: 	2050
	}
	totalCosts = {};
	totalCostSum: number;
	public erroMsg: string;
	advancedSearch = false;
	advancedFilter = false;
	user: User;

	constructor(
		private purchaseService: 	PurchaseService,
		private userService: 		AuthService,
		private dialogService: 		MdlDialogService,
	) {

	}

	public ngOnInit() {
		this.user = this.userService.user;
		this.getPurchases();
		this.searchControl.valueChanges
			.debounceTime(200)
			.subscribe(newValue => this.servSearch()); 
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
		this.initialYearRange();
	}


	servSearch() {
		this.purchaseService.getPurchasesWithFilter(this.searchInput)
							.subscribe(
								purchases 	=> {
									this.purchases = purchases;
									// this.funkyfunc();
									this.totalCosts = this.purchaseService.totalCosts;
									this.totalSumCost = this.purchaseService.totalCostSum;
								},
								error 		=> this.erroMsg = <any>error);
	}

	funkyfunc() {
		// if(!this.purchases){return};
		// for(let i=0; i<this.purchases.length; i++){
		// 	let purchase = this.purchases[i];
		// 	this.totalCosts[`${purchase._id}`] = this.calcTotalCost(purchase);
		// }
	}

	validOnSearch(purchase: Purchase): boolean {
		return this.totalCosts[purchase._id] > 0
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
		if(this.searchInput){
			this.getPurchases();
		}
		
		if(!this.advancedSearch) {
			this.searchInput = "";
			this.calcTotalAmount = totalAmountOfYears
		}
		else {
			this.filterUnitInput = "";
			this.filterYearInput = "";
			this.initialYearRange();
			this.advancedFilter = false;
			this.purchaseService.advFilter(undefined, "");
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
		
		// this.advancedFilter = true;

		this.purchaseService.advFilter(this.filterYearInput, this.filterUnitInput)
							.subscribe(
								purchase => {
									console.log('Yo');
								},
								error    => console.log("Error: "+<any>error)
							);

	}

	initialYearRange(): void {
		this.yearRange = {
			from: 	0,
			to:		2050
		}
	}

	calcTotalCost(purchase: Purchase) {
		return totalCostForYears(purchase, this.yearRange.from, this.yearRange.to);
	}

	misha(id) {
		return this.totalCosts[`${id}`];
	}

	mish(any){
		this.totalSumCost = this.purchaseService.totalCostSum;
		return this.totalSumCost;
	}

	calcTotalSum(purchases: Purchase[]): number{
		let sum = 0;
		return sum;
	}

	tempFunc(){
		this.purchaseService.advFilter(2015, "586c9d4ea31bdc0957621782")
							.subscribe(
								purchases 	=> {
									this.purchases = purchases;
									this.totalCosts = this.purchaseService.totalCosts;
									this.totalSumCost = this.purchaseService.totalCostSum;
								},
								error 		=> this.erroMsg = <any>error);
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

