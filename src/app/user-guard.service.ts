import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    if(url.search('/units') == 0) {
      return this.checkAdminPermission(url);
    }
    return this.checkBasicPermission(url);
  }

  checkAdminPermission(url: string): boolean {
    if(this.authService.isAdmin()) {return true;}
    console.log("You Are Not Allowed HERE!");
    return false;
  }

  checkBasicPermission(url: string): boolean {
    if(this.authService.canView()) { return true }
    console.log("You can not access");
    return false;
  }

  getUser() {
    return this.authService.user;
  }
}
