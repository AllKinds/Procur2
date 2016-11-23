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

export const TEST_VALUE = new OpaqueToken('test value');
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

  @Output() outputVar = new EventEmitter<string>();

  @ViewChild('firstElement') private inputElement: MdlTextFieldComponent;

  public form: FormGroup;
  public username = new FormControl('',  Validators.required);
  public password = new FormControl('', Validators.required);
  // Mine //
  public productId = new FormControl('', Validators.required);
  public publisherName= new FormControl('', Validators.required);
  public licenceCost= new FormControl('', Validators.required);
  // ---- //
  public processingLogin = false;
  public statusMessage = '';
  public testValue:Function;

  constructor(
    private dialog: MdlDialogReference,
    private fb: FormBuilder,
    private loginService: LoginService,
    @Inject( TEST_VALUE) testValue: Function) {

    console.log(`injected test value: ${testValue}`);
    this.testValue = testValue;
    // just if you want to be informed if the dialog is hidden
    this.dialog.onHide().subscribe( () => console.log('login dialog hidden') );
    this.dialog.onVisible().subscribe( () => {
      console.log('set focus');
      testValue();
      this.inputElement.setFocus();
    });

  }


  public ngOnInit() {
    this.form = this.fb.group({
      'username':       this.username,
      'password':       this.password,
      'productId':      this.productId,
      'publisherName':  this.publisherName,
      'licenceCost':    this.licenceCost 
    });
  }


  public login() {
    this.processingLogin = true;
    this.statusMessage = 'checking your credentials ...';

    let obs = this.loginService.login(this.username.value, this.password.value);
    obs.subscribe( () => {

      this.processingLogin = false;
      this.statusMessage = 'you are logged in ...';

      setTimeout( () => {
        this.dialog.hide();
      }, 500);

    });
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialog.hide();
  }

  public onSubmit() {
    console.log(this.form.value);
    this.outputVar.emit(this.form.value.publisherName);
    this.testValue();
    this.dialog.hide();
  }
}