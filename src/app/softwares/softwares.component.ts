import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Software } from './software';
import { SoftwareDataService } from './software-data-service';


import {
  IMdlTableModelItem,
  MdlDefaultTableModel,
  MdlDialogComponent,
  // MdlDialogReference,
  // MdlDialogService,
} from 'angular2-mdl';


export interface ITableItem extends IMdlTableModelItem, AfterViewInit {
  productId: number;
  publisherName: string;
  licenceCost: number;
}


@Component ({
	selector: 'softwaresTab',
	templateUrl: 'softwares.component.html',
})

export class Softwares {
	//softwares: Software[];
	public dialog:MdlDialogComponent;
	private softwares;
	public addSoftware:Function;
	@ViewChild('editUserDialog') editUserDialog:MdlDialogComponent;

	ngAfterViewInit() {
		let dialog = this.editUserDialog;
		this.closeTheForm = function(software:Software) {
			if (software) {this.addSoftware(software)};
			dialog.close();
		}
	}
	// let dialog = element();
	constructor(
		private softwareDataService: SoftwareDataService
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
	  //this.theBoundCallback = this.closeTheForm.bind('this');
	}

	onDialogShow(dialogRef) {

	}

	onDialogHide() {

	}

	public closeTheForm(software:Software) {}


	// public showDialog() {
	//     let result = this.dialogService.alert('This is a simple Alert');
	//       result.then( () => console.log('alert closed') );
	//   }
}