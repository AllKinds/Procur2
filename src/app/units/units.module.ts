import { NgModule } 	from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlModule } 	from 'angular2-mdl';
import { FormsModule } from '@angular/forms';

import { UnitsMgmnt } from './units.component';

import { UnitService } 		from './unit.service';
import { PurchaseService }  from '../purchases/purchase.service';
import { UserGuard }		from '../user-guard.service';

import { UnitRoutingModule } from './units-routing.module';

@NgModule({
	imports: [
		CommonModule, // ??
		FormsModule,
		MdlModule,
		UnitRoutingModule
	],
	declarations: [
		UnitsMgmnt
	],
	providers: [
		UnitService,
		PurchaseService,
		UserGuard
	]
})
export class UnitsModule {};