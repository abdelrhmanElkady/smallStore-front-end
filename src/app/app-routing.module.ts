import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayReceiptsComponent } from './day-receipts/day-receipts.component';
import { DemoComponent } from './demo/demo.component';

import { WarehouseComponent } from './warehouse/warehouse.component';



const routes: Routes = [
  {path:"",redirectTo:"demo",pathMatch:"full"},
  {path:"demo",component:DemoComponent},
  {path:"warehouse",component:WarehouseComponent},
  {path:"DayReceipts/:id",component:DayReceiptsComponent},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
