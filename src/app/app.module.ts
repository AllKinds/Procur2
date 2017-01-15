import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
// Mine:
import { MdlModule } from 'angular2-mdl';
// Components
import { AppComponent }             from './app.component';
import { Softwares }                from './softwares/softwares.component';
// import { UnitsMgmnt }               from './units/units.component';
import { ReactiveFormsDemo }        from './softwares/reactiveForm/reactiveform.component';
import { SoftwareInfoComponent }    from './softwares/softwareInfoComponent.component';
import { LoginComponent }           from './login/login.component';
import { PageNotFoundComponent }    from './notFound.component';
// import { DialogDemo } from './softwares/newSoftware/newSoftware.component';
// Services
import { SoftwareDataService }     from './softwares/software-data-service';
import { PurchaseService }         from './purchases/purchase.service';
// import { UserService }             from './users/user.service';
// import { UnitService }             from './units/unit.service';
import { MdlDialogService,  }      from 'angular2-mdl';

import { RouterModule }            from '@angular/router';
// import { LoginModule } from './softwares/newSoftware/login.module';
import { AppRoutingModule }        from './app-routing.module';
import { LoginRoutingModule }      from './login/login.module';
import { UnitsModule }             from './units/units.module';
// import { UserModule }              from './users/users.module';

// import { LoginDialogComponent } from './softwares/newSoftware/login-dialog.component';
import { DialogDemo }              from './softwares/newSoftware/dialog.component';
// import { NewSoftwareDialog } from  './softwares/newSoftware/newSoftwareDialog.component';


// Purchases
 import { Purchases }             from './purchases/purchases.component';
 // import { PurchaseDataService }   from './data/purchase-data-service';
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
    PurchaseInfoComponent,
    LoginComponent,
    PageNotFoundComponent
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
    LoginRoutingModule,
    AppRoutingModule,
    UnitsModule,
    // UserModule
  ],
  providers: [
    SoftwareDataService,
    PurchaseService,
    // UserService,
    MdlDialogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
