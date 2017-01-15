import { Component } from '@angular/core';
import {
  MdlDialogService,
  MdlDialogReference
} from 'angular2-mdl';

import { Router } from '@angular/router';

import { UserGuard } from './user-guard.service';
import { AuthService } from './auth.service';

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
    // private userService: UserService
    private userService: AuthService
   ){}

  ngOnInit() {
    // this.updateUser();
    this.getMyUser();
    this.user = this.userService.user;
  }

  getMyUser() {
   this.userService.getUser()
                   .subscribe(
                      user => this.updateUser(),
                      error => console.log(error)
                    );
  }


  updateUser() {
    this.user = this.userService.user;
  }

  tabChanged($event) {
  	// TODO funtion
  } 

  goto(tab: string) {
    this.router.navigate(['/'+tab]);
  }
}
