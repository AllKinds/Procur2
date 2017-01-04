import { Component } 		   from '@angular/core';
import { Purchase, totalAmount }   		   from './purchase';
// import { Unit } from '../units/unit';
// import { PurchaseDataService } from '../data/purchase-data-service';
import { PurchaseService } from './purchase.service';

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
	private searchInput="";
	public calcTotalAmount = totalAmount;
	public erroMsg: string;

	constructor(
		// private purchaseDataService: PurchaseDataService,
		private purchaseService: PurchaseService,
		private dialogService: MdlDialogService,
		// private dialog: MdlDialogReference
	) {}

	public ngOnInit() {
	  this.getPurchases();
	}

	getPurchases() {
		console.log("sdljfhsdjklfhsdk");
		this.purchaseService.getPurchases()
						.subscribe(
							purchases 	=> {console.log(this.purchases);this.purchases = purchases;},
							error 		=> this.erroMsg = <any>error);
		console.log(this.purchases);
		console.log(this.erroMsg);
	}

	validOnSearch(purchase: Purchase): boolean {
		return (!this.searchInput) ||
		 // purchase.softwareId.toString().includes(	this.searchInput.toLowerCase() ) ||
		 purchase.unit.unitId.toString().includes(		this.searchInput.toLowerCase() ) ||
		 purchase.unit.subUnit.toLowerCase().includes(	this.searchInput.toLowerCase() );
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
}