import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnitsMgmnt }   from './units.component';

import { UserGuard }	from '../user-guard.service';

const unitsRoutes: Routes = [
  { path: 'units',  component: UnitsMgmnt, canActivate: [UserGuard] },
  // { path: 'hero/:id', component: HeroDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(unitsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UnitRoutingModule { }
