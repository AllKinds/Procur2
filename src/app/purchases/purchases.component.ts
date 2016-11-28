import { Component } 		   from '@angular/core';
import { Purchase }   		   from '../models/purchase';
import { PurchaseDataService } from '../data/purchase-data-service';

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

	constructor(
		private purchaseDataService: PurchaseDataService,
		private dialogService: MdlDialogService
	) {}

	public ngOnInit() {
		this.purchases = this.purchaseDataService.getPurchases();
	}

	validOnSearch(purchase: Purchase): boolean {
		return (!this.searchInput) ||
		 purchase.softwareId.toString().includes(	this.searchInput.toLowerCase() ) ||
		 purchase.unitId.toString().includes(		this.searchInput.toLowerCase() ) ||
		 purchase.subUnit.toLowerCase().includes(	this.searchInput.toLowerCase() );
	}

	showPurchaseInfo($event, index, purchase: Purchase) {
		let pDialog = this.dialogService.showCustomDialog({
			component: PurchaseInfoComponent,
			providers: [{provide: PURCHASE_PROPS, useValue: purchase}],
			isModal: true,
			clickOutsideToClose: true,
		})
		pDialog.subscribe( (dialogReference: MdlDialogReference) => {
			console.log('info dialog is visible', dialogReference );
		});
	}
}