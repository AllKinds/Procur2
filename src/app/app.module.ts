import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
// Mine:
import { MdlModule } from 'angular2-mdl';
// Components
import { AppComponent } from './app.component';
import { Softwares } from './softwares/softwares.component';
import { ReactiveFormsDemo } from './softwares/reactiveForm/reactiveform.component';
// import { DialogDemo } from './softwares/newSoftware/newSoftware.component';
// Services
import { SoftwareDataService } from './softwares/software-data-service';
import { MdlDialogService,  } from 'angular2-mdl';

import { RouterModule } from '@angular/router';
import { LoginModule } from './softwares/newSoftware/login.module';

// import { LoginDialogComponent } from './softwares/newSoftware/login-dialog.component';
import { DialogDemo } from './softwares/newSoftware/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    Softwares,
    ReactiveFormsDemo,
    DialogDemo,
    // LoginDialogComponent
  ],
  // entryComponents: [LoginDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    // Mine
    MdlModule,
    ReactiveFormsModule,
    LoginModule
  ],
  providers: [
    SoftwareDataService,
    MdlDialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
