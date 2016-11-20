import { Component } from '@angular/core';
import {
  MdlDialogService,
  MdlDialogReference
} from 'angular2-mdl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Procurement';
  dialogService: MdlDialogService;
  tabChanged($event) {
  	// TODO funtion
  } 

}
