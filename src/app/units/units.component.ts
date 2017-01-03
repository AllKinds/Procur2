import { Component, ViewChild, OnInit} from '@angular/core';
import { Unit } from './unit';
import { UnitService } from './unit.service';

import {
	MdlDialogService,
	MdlDialogReference
} from 'angular2-mdl';

// import {
// 	PurchaseInfoComponent,
// 	PURCHASE_PROPS
// } from './purchaseInfoComponent.component'

@Component ({
	selector: 'units-tab',
	templateUrl: 'units.component.html',
	styleUrls: ['units.component.css']
})

export class UnitsMgmnt {
	private units;
	private searchInput="";
	public erroMsg: string;
	unitId: string = "";
	subUnit: string = "";

	constructor(
		private unitService: UnitService,
		private dialogService: MdlDialogService,
	) {}

	public ngOnInit() {
	  this.getUnits();
	}

	getUnits() {
		this.unitService.getUnits()
						.subscribe(
							units 		=> this.units = units,
							error 		=> this.erroMsg = <any>error);
		console.log(this.units);
		console.log(this.erroMsg);
	}

	validOnSearch(unit: Unit): boolean {
		return (!this.searchInput) ||
		 unit.unitId.toString().includes(		this.searchInput.toLowerCase() ) ||
		 unit.subUnit.toLowerCase().includes(	this.searchInput.toLowerCase() );
	}

	// showPurchaseInfo($event, index, purchase: Purchase) {
	// 	let pDialog = this.dialogService.showCustomDialog({
	// 		component: PurchaseInfoComponent,
	// 		providers: [{provide: PURCHASE_PROPS, useValue: purchase}],
	// 		styles: {'width': '500px', 'overflow-y': 'auto', 'max-height': '90%'},
	// 		isModal: true,
	// 		clickOutsideToClose: true,
	// 	})
	// 	pDialog.subscribe( (dialogReference: MdlDialogReference) => {
	// 		console.log('info dialog is visible', dialogReference );
	// 	});
	// }
	tempAddUnit(){
		let unit = new Unit(
			this.unitId,
			this.subUnit
		);
		this.addUnit(unit);
	}
	addUnit(unit: Unit){
		this.unitService.addUnit(unit)
			.subscribe(
				unit => {
					console.log('Added: '+ unit);
				},
				error    => console.log("Error: "+<any>error)
			);
	}

	deleteUnit(unit: Unit) {
		this.unitService.deleteUnit(unit._id)
								.subscribe(
									unit  => console.log("Deleted "+unit),
									error => console.log("Error: "+<any>error)
									);
	}
}