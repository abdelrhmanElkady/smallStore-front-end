import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';




import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RepeatTypeComponent } from './Models/repeat-section.type';
import { DayReceiptsComponent } from './day-receipts/day-receipts.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
// import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    WarehouseComponent,
    RepeatTypeComponent,
    
    DayReceiptsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormlyModule.forRoot({
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
      ],
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
