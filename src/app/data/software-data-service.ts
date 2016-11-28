import { SOFTWARES } from './software_mocks';
import { Injectable } from '@angular/core';

@Injectable()
export class SoftwareDataService {
	getSoftwares() {
		return SOFTWARES;
	}
}