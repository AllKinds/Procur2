import { Component, ViewChild, OnInit} 	from '@angular/core';
import { FormControl }					from '@angular/forms';
import { NewSoftwareDialog } from  './newSoftware/newSoftwareDialog.component';

import { Software, getPriceByYear } from './software';
import { User }		from '../users/user';

import { SoftwareDataService } from './software-data-service';
import { AuthService } 		   from '../auth.service';


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


@Component ({
	selector: 'softwaresTab',
	templateUrl: 'softwares.component.html',
 	styleUrls: ['softwares.component.css']
})

export class Softwares implements OnInit{
	public dialog:MdlDialogComponent;
	public something: any;
	private softwares: Software[];
	public mode= 'Observable';
	public searchInput="";
	public errorMessage: string;
	public currentYear = new Date().getFullYear();
	private user: User;
	public getSoftwarePriceByYear = getPriceByYear;

	searchControl = new FormControl();

	constructor(
		private softwareDataService: SoftwareDataService,
		private dialogService: 		 MdlDialogService,
		private userService: 		 AuthService,
	) {}

	public ngOnInit() {
	  this.user = this.userService.user;
	  console.log(this.user);
	  this.getSoftwares();
	  this.searchControl.valueChanges
	  	  .debounceTime(200)
	  	  .subscribe(newValue => this.servSearch());
	}

	getSoftwares() {
		this.softwareDataService.getSoftwares()
						.subscribe(
							softwares 	=> this.softwares = softwares,
							error 		=> this.errorMessage = <any>error);
		console.log(this.softwares);
		console.log(this.errorMessage);
	}

	addSoftware(software: Software) {
		if(!software) {
			return;
		}
		this.softwareDataService.addSoftware(software)
			.subscribe(
				software	=> this.pushSoftware(software),
				error 		=> this.errorMessage = <any>error);
	}

	pushSoftware(software){
		console.log("Im Here");
		this.softwares.push(software);
	}

	validOnSearch(software:Software): boolean {
		return (!this.searchInput) ||
		 software.softwareId.toString().includes(		this.searchInput.toLowerCase() ) ||
		 software.softwareName.toLowerCase().includes(	this.searchInput.toLowerCase() ) ||
		 software.publisherName.toLowerCase().includes(	this.searchInput.toLowerCase() ) ||
		 software.licenceCost.toString().includes(		this.searchInput.toLowerCase() );
	}

	showSoftwareInfo(software:Software){
		console.log(software);

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
		this.addSoftware(newSoftware);
	}

	OrderByParam = 'softwareName';
	orderDesc = {
		softwareId: 	false,
		softwareName:	false,
		publisherName: 	false,
		licenceCost: 	false
	}

	getOrder() {
		return this.orderDesc[this.OrderByParam]? ['-' + this.OrderByParam] : [this.OrderByParam]; 
	}

	servSearch() {
		this.softwareDataService.getSoftwaresWithFilter(this.searchInput)
			.subscribe(
				softwares => this.softwares = softwares,
				error 	  => this.errorMessage = <any>error	);
	}

	public showDialog($event: MouseEvent) {

	  let pDialog = this.dialogService.showCustomDialog({
	    component: NewSoftwareDialog,
	    providers: [],
	    isModal: true,
	    styles: {'width': '300px'},
	    clickOutsideToClose: true,
	    openFrom: $event,
	    enterTransitionDuration: 400,
	    leaveTransitionDuration: 400
	  });
	  pDialog.subscribe( (dialogReference: MdlDialogReference) => {
	    console.log('dialog visible', dialogReference);
	  });
	  pDialog.subscribe( () => console.log('alert closed') );


	}

}