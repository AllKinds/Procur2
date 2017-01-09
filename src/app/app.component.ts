import { Component } from '@angular/core';
import {
  MdlDialogService,
  MdlDialogReference
} from 'angular2-mdl';

import { Router } from '@angular/router';

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

  constructor(
    private router: Router
   ){}

  tabChanged($event) {
  	// TODO funtion
  } 

  goto(tab: string) {
    this.router.navigate(['/'+tab]);
  }
}
