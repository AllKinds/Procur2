import { Component, OnInit, OpaqueToken, Inject } from '@angular/core';
import { Software, deleteSoftwareFromArray } from './software';
import { SoftwareDataService } from './software-data-service';
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
									soft  => {console.log("Deleted "+soft); this.dialog.hide()},
									error => this.errorMsg = <any>error
									);
	}
}

