import { Component, OnInit, OpaqueToken, Inject } from '@angular/core';

import { Software, deleteSoftwareFromArray, PriceByYear } from './software';
import { User } 							 from '../users/user';
import { Purchase, AmountByYear } 						 from '../purchases/purchase';

import { SoftwareDataService } from './software-data-service';
import { PurchaseService } from '../purchases/purchase.service';
import { AuthService } 		   from '../auth.service';

import { MdlDialogReference } from 'angular2-mdl';

export const SOFTWARE_PROPS = new OpaqueToken('tmp value');

@Component({
	selector: 'software-info',
	templateUrl: 'softwareInfoComponent.component.html'
})
export class SoftwareInfoComponent {

	errorMsg: string;
	public software: Software;
	user: User;
	toggleAddPrice = false;
	togglePurchaseSoft = false;

	newPriceForYear = new PriceByYear();
	newPurchase 	= new AmountByYear();

	constructor(
		private dialog: MdlDialogReference,
		private softwareDataService: SoftwareDataService,
		private purhcaseDataService: PurchaseService,
		private userService: 		 AuthService,
		@Inject(SOFTWARE_PROPS) software: Software) {
		this.software = software;
		this.user = this.userService.user;
	}
	OnInit() {
		this.user = this.userService.user;
	}
	onDelete(software: Software){
		this.deleteSoftware(software);
	}
	deleteSoftware (software: Software){
		// Add "R U sure??"
		this.softwareDataService.deleteSoftware(software._id)
								.subscribe(
									soft  => {console.log("Deleted "+soft); this.deletePurchasesOfSoftware(software._id); this.dialog.hide()},
									error => this.errorMsg = <any>error
									);
	}

	deletePurchasesOfSoftware (software_id: string) {
		this.purhcaseDataService.deletePurchasesBySoftware(software_id)
			.subscribe(
				res => console.log(res),
				error => this.errorMsg = <any>error 
			);
	}

	purchaseSoftware(software: Software) {
		let unitId = this.user ? this.user.unitId: '5881a78b3779430558ac1dc1'
		let purchase = new Purchase(
			software._id,
			unitId,
			[{
				year: this.newPurchase.year,
				amount: this.newPurchase.amount
			}]
		);
		this.purhcaseDataService.addPurchase(purchase)
			.subscribe(
				purchase => {
					console.log("Hey Hey!");
					this.dialog.hide();
				},
				error 	 => console.log("Error: "+<any>error)
				);
	}

	updateYearPrice() {
		if(!this.newPriceForYear.year || !this.newPriceForYear.price){
			return
		}
		let yearPrice = 
		{
			year: 	parseInt(this.newPriceForYear.year),
			price:	parseInt(this.newPriceForYear.price)
		}
		this.softwareDataService.updateYearPrice(this.software._id, yearPrice)
			.subscribe(
				software => console.log(software),
				error 	 => console.log("Error: "+<any>error)
			);
		this.toggleAddPrice = false;
	}
}

