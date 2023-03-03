import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkOnBoradingItemComponent } from './bulk-on-borading-item/bulk-on-borading-item.component';
import { BulkOnBoradingListComponent } from './bulk-on-borading-list/bulk-on-borading-list.component';
import { BulkOnBoradingComponent } from './bulk-on-borading/bulk-on-borading.component';
import { CoporatesComponent } from './coporates/coporates.component';



const routes: Routes = [

  {path:'' , component: BulkOnBoradingComponent , children: [
    { path: '', component: BulkOnBoradingListComponent }, 
    { path: 'bulk-onborading-item/:id', component: BulkOnBoradingItemComponent },  
    { path: 'coporates', component: CoporatesComponent },  
  ]},


  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BulkOnBoardingRoutingModule { }
