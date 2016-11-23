import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { LoginDialogComponent } from './login-dialog.component';
import { NewSoftwareDialog } from './newSoftwareDialog.component';

import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';
import { MdlModule } from 'angular2-mdl';


@NgModule({
  imports: [MdlModule, CommonModule, ReactiveFormsModule],
  declarations: [NewSoftwareDialog],
  entryComponents: [NewSoftwareDialog],
  providers: [LoginService]
})
export class LoginModule {}