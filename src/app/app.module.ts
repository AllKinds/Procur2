import { BrowserModule }                   from '@angular/platform-browser';
import { NgModule }                        from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule, JsonpModule }         from '@angular/http';
import { MdlModule }                       from 'angular2-mdl';
import { RouterModule }                    from '@angular/router';
import { MaterialModule }                  from '@angular/material';
import { AppRoutingModule }                from './app-routing.module';
import { LoginRoutingModule }              from './login/login.module';
import { UnitsModule }                     from './units/units.module';
import { UsersModule }                     from './users/users.module';
// Components
import { AppComponent }             from './app.component';
import { Softwares }                from './softwares/softwares.component';
import { SoftwareInfoComponent }    from './softwares/softwareInfoComponent.component';
import { LoginComponent }           from './login/login.component';
import { PageNotFoundComponent }    from './notFound.component';
import { NewSoftwareDialog }        from  './softwares/newSoftware/newSoftwareDialog.component';
 import { Purchases }               from './purchases/purchases.component';
 import { PurchaseInfoComponent }   from './purchases/purchaseInfoComponent.component';
// Services
import { SoftwareDataService }     from './softwares/software-data-service';
import { PurchaseService }         from './purchases/purchase.service';
import { MdlDialogService,  }      from 'angular2-mdl';
//  Other
// Pipes
import { OrderBy }   from './pipes/orderBy';
import { keysPipe }  from './pipes/keysPipe';
import 'hammerjs';

// ---------


@NgModule({
  declarations: [
    AppComponent,
    Softwares,
    Purchases,
    SoftwareInfoComponent,
    PurchaseInfoComponent,
    NewSoftwareDialog,
    LoginComponent,
    PageNotFoundComponent,
    OrderBy,
    keysPipe
  ],
  entryComponents: [ 
    SoftwareInfoComponent, 
    PurchaseInfoComponent, 
    NewSoftwareDialog 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    JsonpModule,  // Needed?
    MdlModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    UnitsModule,
    UsersModule,
    AppRoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [
    SoftwareDataService,
    PurchaseService,
    MdlDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
