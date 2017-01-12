import { NgModule } 				from '@angular/core';
import { RouterModule, Routes} 		from '@angular/router';
import { AuthGuard }				from './auth-guard.service';
import { UserGuard }				from './user-guard.service';

import { LoginComponent } 			from './login/login.component';
import { Softwares } 				from './softwares/softwares.component';
// import { UnitsMgmnt }				from './units/units.component';
import { Purchases } 				from './purchases/purchases.component';
import { PageNotFoundComponent } 	from './notFound.component';


const routes: Routes = [
	
	
	{ path: 'login',  	  component: LoginComponent },
	{ path: 'softwares',  component: Softwares, canActivate: [AuthGuard] },
	{ path: 'purchases',  component: Purchases, canActivate: [UserGuard] },
	{ path: '', redirectTo: '/softwares', pathMatch: 'full'},
	// { path: '**', 		  component:PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}