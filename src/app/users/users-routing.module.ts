import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersMgmnt }   from './users.component';

import { UserGuard }	from '../user-guard.service';

const usersRoutes: Routes = [
  { path: 'users',  component: UsersMgmnt, canActivate: [UserGuard] },
  // { path: 'hero/:id', component: HeroDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
