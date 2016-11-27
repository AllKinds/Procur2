import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Software } from './software';
import { SoftwareDataService } from './software-data-service';


import {
  IMdlTableModelItem,
  MdlDefaultTableModel,
  MdlDialogComponent,
  MdlDialogReference,
  MdlDialogService,
} from 'angular2-mdl';

import {
	SoftwareInfoComponent,
	SOFTWARE_PROPS
} from './softwareInfoComponent.component'


export interface ITableItem extends IMdlTableModelItem, AfterViewInit {
  productId: number;
  publisherName: string;
  licenceCost: number;
}


@Component ({
	selector: 'softwaresTab',
	templateUrl: 'softwares.component.html',
	// styleUrls:'
})

export class Softwares {
	//softwares: Software[];
	public dialog:MdlDialogComponent;
	private softwares;
	public addSoftware:Function;
	// let dialog = element();
	constructor(
		private softwareDataService: SoftwareDataService,
		private dialogService: MdlDialogService
	) {}

	public tableModel = new MdlDefaultTableModel([
	  {key: 'productId', name: 'productId', sortable: true, numeric: true},
	  {key: 'publisherName', name: 'publisherName', sortable: true},
	  {key: 'licenceCost', name: 'licenceCost', sortable: true, numeric: true}
	]);

	// constructor(router: Router, route: ActivatedRoute, titleService: Title) {
	//   super(router, route, titleService);
	// }

	public ngOnInit() {
	  this.softwares = this.softwareDataService.getSoftwares();
	  this.tableModel.addAll(this.softwares);
	  this.addSoftware = function(software:Software) {
		console.log('Hi!');
		this.softwares.push(software);
	  }
	}

	showSoftwareInfo($event, index, software:Software){
		console.log(event);
		console.log(index);
		console.log(software);
		// this.dialogService.alert(software.longStringify());

		let pDialog = this.dialogService.showCustomDialog({
			component: SoftwareInfoComponent,
			providers: [{provide: SOFTWARE_PROPS, useValue: software}],
			isModal: true,
			clickOutsideToClose: true,
			enterTransitionDuration: 400,
			leaveTransitionDuration: 400
		});
		pDialog.subscribe( (dialogReference: MdlDialogReference) => {
			console.log('info dialog is visible', dialogReference );
		});
	}

	onCreateNewSoftware(newSoftware){
		console.log(newSoftware);
		this.softwares.push(newSoftware);
		this.tableModel.addAll([newSoftware]);
	}


}