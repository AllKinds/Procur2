import { Component, Renderer } from '@angular/core';
// import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
// import { hostConfig } from '../animations/flyInOutTrigger-animation';
// import {
//   Router,
//   ActivatedRoute
// } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { AbstractDemoComponent } from '../abstract-demo.component';
import {
  MdlDialogService,
  MdlDialogReference,
  MdlSnackbarService,
  IOpenCloseRect
} from 'angular2-mdl';
import {
  // LoginDialogComponent,
  // TEST_VALUE
} from './login-dialog.component';
// Mine
import { NewSoftwareDialog, TEST_VALUE } from  './newSoftwareDialog.component';


@Component({
  selector: 'dialog-demo',
  // host: hostConfig,
  // animations: [
  //   flyInOutTrigger
  // ],
  templateUrl: 'dialog.component.html'
})
export class DialogDemo {

  constructor(
    // router: Router,
    // route: ActivatedRoute,
    // titleService: Title,
    private dialogService: MdlDialogService,
    private snackbarService: MdlSnackbarService) {

    // super(router, route, titleService);

  }

  public showAlert() {
    let result = this.dialogService.alert('This is a simple Alert');
    result.subscribe( () => console.log('alert closed') );
  }

  public showConfirmMessage() {
    let result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    // if you need booth answers
    result.subscribe( () => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );
    // if you only need the confirm answer
    result.onErrorResumeNext().subscribe( () => {
      console.log('confirmed 2');
    })
  }

  public showDialogFullWidthAction($event: MouseEvent) {
    let pDialog = this.dialogService.showDialog({
      title: 'Your choice?',
      message: 'What drink do you prefer to your meal?',
      actions: [
        {
          handler: () => {
              this.snackbarService.showToast('Coke');
          },
          text: 'One Coke' ,
          isClosingAction: true
        },
        {
          handler: () => {
            this.snackbarService.showToast('Vine');
          },
          text: 'A bottle of vine'
        },
        {
          handler: () => {
            this.snackbarService.showToast('Beer');
          },
          text: 'A pint of beer'
        }
      ],
      fullWidthAction: true,
      isModal: false,
      openFrom: $event,
      closeTo: {
        left: document.body.offsetWidth/2,
        height: 0,
        top: document.body.offsetHeight/2,
        width: 0} as IOpenCloseRect
    });
    pDialog.subscribe( (dialogReference) => console.log('dialog visible', dialogReference) );
  }

  public showDialog($event: MouseEvent) {

    let pDialog = this.dialogService.showCustomDialog({
      component: NewSoftwareDialog,
      providers: [{provide: TEST_VALUE, useValue: this.helloFunc}],
      isModal: true,
      styles: {'width': '300px'},
      clickOutsideToClose: true,
      openFrom: $event,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.subscribe( (dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
      console.log("BlaBla"+TEST_VALUE);
    });
    pDialog.subscribe( () => console.log('alert closed') );


  }

  public helloFunc() {
    alert("hello there...");
  }
}