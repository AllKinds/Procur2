import { Component, ViewChild, OnInit} from '@angular/core';
import { Unit } from './unit';
import { UnitService } from './unit.service';
import { PurchaseService } from '../purchases/purchase.service';

import {
	MdlDialogService,
	MdlDialogReference
} from 'angular2-mdl';

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
		private purhcaseDataService: PurchaseService,
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
									unit_id  => {console.log("Res is "+unit_id); this.deletePurchasesByUnit(unit_id)},
									error => console.log("Error: "+<any>error)
									);
	}

	deletePurchasesByUnit (unit_id: string) {
		this.purhcaseDataService.deletePurchasesByUnit(unit_id)
			.subscribe(
				res => console.log(res),
				error => console.log("Error: "+<any>error)
			);
	}
}