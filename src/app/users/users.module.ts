import { NgModule } 		from '@angular/core';
import { CommonModule } 	from '@angular/common';
import { MdlModule } 		from 'angular2-mdl';
import { FormsModule } 		from '@angular/forms';
import { MaterialModule } 	from '@angular/material';

import { UsersMgmnt } from './users.component';

import { UserService } 		from './user.service';
import { PurchaseService }  from '../purchases/purchase.service';
import { UserGuard }		from '../user-guard.service';

import { UserRoutingModule } from './users-routing.module';


@NgModule({
	imports: [
		CommonModule, // ??
		FormsModule,
		MdlModule,
		UserRoutingModule,
		MaterialModule
	],
	declarations: [
		UsersMgmnt
	],
	providers: [
		UserService,
		PurchaseService,
		UserGuard
	]
})
export class UsersModule {};