import { Component, OnInit, OpaqueToken, Inject } from '@angular/core';
import { Software } from './software';

export const SOFTWARE_PROPS = new OpaqueToken('tmp value');

@Component({
	selector: 'software-info',
	templateUrl: 'softwareInfoComponent.component.html'
})
export class SoftwareInfoComponent {

	public softwareProps: Software;

	constructor(
		@Inject(SOFTWARE_PROPS) softwareProps:Software) {
		this.softwareProps = softwareProps;
	}
}

