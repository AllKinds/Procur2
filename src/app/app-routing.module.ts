import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { Softwares } from './softwares/softwares.component';
import { UnitsMgmnt } from './units/units.component';
import { Purchases } from './purchases/purchases.component';


const routes: Routes = [
	{ path: '', redirectTo: '/softwares', pathMatch: 'full'},
	{ path: 'softwares',  component: Softwares },
	{ path: 'unitsMgmnt', component: UnitsMgmnt, canLoad:()=>true },
	{ path: 'purchases',  component: Purchases }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}