import { Component } 		   from '@angular/core';
import { Purchase, totalAmount, totalAmountOfYears, purchasedForYear, totalCostForYears }   		   from './purchase';
import { getPriceByYear } from '../softwares/software'; 
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
	public getSoftwareCurrentPrice = getPriceByYear;
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
	toggleDateOrder = false;
	OrderByParam = 'lastUpdated';
	toggleOrder = {
		softId:	false,
		unitId: false,
		subUnit: false,
		lastUpdated: false
	}
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

	getOrder() {
		return this.toggleOrder[this.OrderByParam]? [this.OrderByParam] : ['-'+this.OrderByParam];
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
									this.totalCosts = this.purchaseService.totalCosts;
									this.totalSumCost = this.purchaseService.totalCostSum;
								},
								error 		=> this.erroMsg = <any>error);
	}


	validOnSearch(purchase: Purchase): boolean {
		return this.totalCosts[purchase._id] > 0
	}

	showPurchaseInfo(purchase: Purchase) {
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

		this.purchaseService.advFilter(parseInt(this.filterYearInput), this.filterUnitInput)
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

	simpleShortDate(date: Date): string{
		let d = new Date(date);
		let day = d.getDay();
		let month = d.getMonth() + 1;
		let year = d.getFullYear();

		return day+'/'+month+'/'+year;
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

