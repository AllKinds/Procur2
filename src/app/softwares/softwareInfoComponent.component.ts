import { Component, OnInit, OpaqueToken, Inject } from '@angular/core';
import { Software, deleteSoftwareFromArray } from './software';
import { SoftwareDataService } from './software-data-service';
import { PurchaseService } from '../purchases/purchase.service';
import { Purchase } from '../purchases/purchase';
import { MdlDialogReference } from 'angular2-mdl';

export const SOFTWARE_PROPS = new OpaqueToken('tmp value');

@Component({
	selector: 'software-info',
	templateUrl: 'softwareInfoComponent.component.html'
})
export class SoftwareInfoComponent {

	errorMsg: string;
	public software: Software;

	constructor(
		private dialog: MdlDialogReference,
		private softwareDataService: SoftwareDataService,
		private purhcaseDataService: PurchaseService,
		@Inject(SOFTWARE_PROPS) software: Software) {
		this.software = software;
	}

	onDelete(software: Software){
		// let id = this.softwareDataService.deleteSoftware(software);
		// console.log("Software "+id+" was deleted");
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
		let purchase = new Purchase(
			software._id,
			"586c9d4ea31bdc0957621782",
			[]
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
}

