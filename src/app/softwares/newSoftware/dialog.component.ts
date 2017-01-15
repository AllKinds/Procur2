import { Component, Renderer, Output, EventEmitter } from '@angular/core';

import { Title } from '@angular/platform-browser';
import {
  MdlDialogService,
  MdlDialogReference,
  MdlSnackbarService,
  IOpenCloseRect
} from 'angular2-mdl';
// Mine
import { NewSoftwareDialog } from  './newSoftwareDialog.component';
import { Software } from '../software';

@Component({
  selector: 'dialog-demo',
  templateUrl: 'dialog.component.html'
})
export class DialogDemo {

  @Output() newSoftware = new EventEmitter<Software>();
  constructor(
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService
  ) {}

  public showDialog($event: MouseEvent) {

    let pDialog = this.dialogService.showCustomDialog({
      component: NewSoftwareDialog,
      providers: [],
      isModal: true,
      styles: {'width': '300px'},
      clickOutsideToClose: true,
      openFrom: $event,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.subscribe( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });
    pDialog.subscribe( () => console.log('alert closed') );


  }
}