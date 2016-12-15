import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
// Mine:
import { MdlModule } from 'angular2-mdl';
// Components
import { AppComponent } from './app.component';
import { Softwares } from './softwares/softwares.component';
import { ReactiveFormsDemo } from './softwares/reactiveForm/reactiveform.component';
import { SoftwareInfoComponent } from './softwares/softwareInfoComponent.component';
// import { DialogDemo } from './softwares/newSoftware/newSoftware.component';
// Services
import { SoftwareDataService } from './softwares/software-data-service';
import { MdlDialogService,  } from 'angular2-mdl';

import { RouterModule } from '@angular/router';
import { LoginModule } from './softwares/newSoftware/login.module';

// import { LoginDialogComponent } from './softwares/newSoftware/login-dialog.component';
import { DialogDemo } from './softwares/newSoftware/dialog.component';
// import { NewSoftwareDialog } from  './softwares/newSoftware/newSoftwareDialog.component';


// Purchases
 import { Purchases }             from './purchases/purchases.component';
 import { PurchaseDataService }   from './data/purchase-data-service';
 import { PurchaseInfoComponent } from './purchases/purchaseInfoComponent.component';
// ---------


@NgModule({
  declarations: [
    AppComponent,
    Softwares,
    Purchases,
    ReactiveFormsDemo,
    DialogDemo,
    SoftwareInfoComponent,
    PurchaseInfoComponent
    // LoginDialogComponent
  ],
  entryComponents: [ SoftwareInfoComponent, PurchaseInfoComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    JsonpModule,  // Needed?
    // Mine
    MdlModule,
    ReactiveFormsModule,
    LoginModule
  ],
  providers: [
    SoftwareDataService,
    PurchaseDataService,
    MdlDialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
