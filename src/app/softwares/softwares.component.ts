import { Component, ViewChild, OnInit} from '@angular/core';

import { Software } from './software';
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
	constructor(
		private softwareDataService: SoftwareDataService,
		private dialogService: 		 MdlDialogService,
		private userService: 		 AuthService,
	) {}


	public ngOnInit() {
	  this.user = this.userService.user;
	  this.getSoftwares();
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

	showSoftwareInfo($event, index, software:Software){
		console.log(event);
		console.log(index);
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

}