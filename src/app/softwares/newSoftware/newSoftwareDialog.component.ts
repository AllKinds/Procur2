import {
  Component,
  ViewChild,
  HostListener,
  OnInit,
  Inject,
  OpaqueToken,
  EventEmitter,
  Output
} from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MdlTextFieldComponent, MdlDialogReference } from 'angular2-mdl';

import { Software } from '../software';

export const MY_EMITT = new OpaqueToken('testy value');
const numValidator = Validators.pattern('[1-9]+[0-9]*');

@Component({
  selector: 'newSoftwareDialog',
  templateUrl: 'newSoftwareDialog.component.html',
  styles: [
    `
     .status-bar {
         text-align: center;
     }
    `
  ]
})
export class NewSoftwareDialog implements OnInit {



  public form: FormGroup;

  public productId = new FormControl('', Validators.required);
  public publisherName= new FormControl('', Validators.required);
  public licenceCost= new FormControl('', Validators.required);

  public processingLogin = false;
  public statusMessage = '';
  public myEmitt: EventEmitter<Software>;
  public newSoft: Software;

  constructor(
    private dialog: MdlDialogReference,
    private fb: FormBuilder,
    private loginService: LoginService,
    @Inject( MY_EMITT) myEmitt: EventEmitter<Software>
    ){

    this.myEmitt = myEmitt;
    // just if you want to be informed if the dialog is hidden
    this.dialog.onHide().subscribe( () => console.log('login dialog hidden') );
    this.dialog.onVisible().subscribe( () => {
      console.log('set focus');
      //submit_new_software();
    });

  }


  public ngOnInit() {
    this.form = this.fb.group({
      'productId':      this.productId,
      'publisherName':  this.publisherName,
      'licenceCost':    this.licenceCost 
    });
  }


  // public login() {
  //   this.processingLogin = true;
  //   this.statusMessage = 'checking your credentials ...';

  //   let obs = this.loginService.login(this.username.value, this.password.value);
  //   obs.subscribe( () => {

  //     this.processingLogin = false;
  //     this.statusMessage = 'you are logged in ...';

  //     setTimeout( () => {
  //       this.dialog.hide();
  //     }, 500);

  //   });
  // }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialog.hide();
  }

  public onSubmit() {
    this.processingLogin = true;
    this.statusMessage = 'checking your request ...';

    console.log(this.form.value);

    this.newSoft = new Software(
      this.productId.value,
      this.publisherName.value,
      this.licenceCost.value
      );

    
    this.statusMessage = 'Submiting your request';

    this.myEmitt.emit(this.newSoft);
    setTimeout( () => { // Remeber To Delete That Delay
      this.processingLogin = false;
      this.dialog.hide();
    }, 500);
  }
}