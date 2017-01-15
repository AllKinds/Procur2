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
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MdlTextFieldComponent, MdlDialogReference } from 'angular2-mdl';
import { SoftwareDataService } from '../software-data-service';

import { Software } from '../software';

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
  public productName = new FormControl('', Validators.required);
  public publisherName= new FormControl('', Validators.required);
  public licenceCost= new FormControl('', Validators.required);

  public processingLogin = false;
  public statusMessage = '';
  // public newSoft: Software;

  constructor(
    private softwareDataService: SoftwareDataService,
    private dialog: MdlDialogReference,
    private fb: FormBuilder
    ){

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
      'productName':  this.productName,
      'publisherName':  this.publisherName,
      'licenceCost':    this.licenceCost 
    });
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialog.hide();
  }

  public onSubmit() {
    this.processingLogin = true;
    this.statusMessage = 'checking your request ...';

    console.log(this.form.value);

    let newSoft = new Software(
      this.productId.value,
      this.productName.value,
      this.publisherName.value,
      this.licenceCost.value
      );

    this.softwareDataService.addSoftware(newSoft)
      .subscribe(
        software  => {
          console.log('Added : '+software);
          this.statusMessage = 'Submiting your request';

          setTimeout( () => { // Remeber To Delete That Delay
            this.processingLogin = false;
            this.dialog.hide();
          }, 500);
        },
        error     => console.log('Error : '+<any>error)
      );
    
    
  }
}