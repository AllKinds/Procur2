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
// Services
import { SoftwareDataService } from './softwares/software-data-service';
import { MdlDialogService } from 'angular2-mdl';

@NgModule({
  declarations: [
    AppComponent,
    Softwares,
    ReactiveFormsDemo
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // Mine
    MdlModule,
    ReactiveFormsModule
  ],
  providers: [
    SoftwareDataService,
    MdlDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
