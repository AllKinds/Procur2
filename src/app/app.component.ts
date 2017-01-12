import { Component } from '@angular/core';
import {
  MdlDialogService,
  MdlDialogReference
} from 'angular2-mdl';

import { Router } from '@angular/router';

import { UserGuard } from './user-guard.service';
import { UserService } from './users/user.service';

// Add the RxJS Observable operators.
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Procurement';
  dialogService: MdlDialogService;
  user: any;

  constructor(
    private router: Router,
    private userService: UserService
    private userGService: UserGuard
   ){}

  ngOnInit() {
    // this.updateUser();
    this.getMyUser();
  }

  getMyUser() {
   this.userService.getUser()
                   .subscribe(
                      user => this.user = user,
                      error => this.erroMsg = <any>error
                    );
  }

  updateUser() {
    this.user = this.userGService.getUser();
  }

  tabChanged($event) {
  	// TODO funtion
  } 

  goto(tab: string) {
    this.router.navigate(['/'+tab]);
  }
}
