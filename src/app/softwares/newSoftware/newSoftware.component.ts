import { Component, HostListener } from '@angular/core';

import {
  MdlDialogReference
} from 'angular2-mdl';

@Component({
    selector: 'newSoftware',
    templateUrl: 'newSoftware.component.html'
  })
  export class LoginDialogComponent {

    constructor(private dialog: MdlDialogReference) {

      // register a listener if you want to be informed if the dialog is closed.
      this.dialog.onHide().subscribe( () => console.log('login dialog hidden') );
    }

    public login() {
      console.log('login', this.dialog);
      this.dialog.hide();
    }

    @HostListener('keydown.esc')
    public onEsc(): void {
        this.dialog.hide();
    }
  }
