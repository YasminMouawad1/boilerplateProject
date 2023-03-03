import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkOnBoardingRoutingModule } from './bulk-on-boarding-routing.module';
import { BulkOnBoradingComponent } from './bulk-on-borading/bulk-on-borading.component';
import { BulkOnBoradingListComponent } from './bulk-on-borading-list/bulk-on-borading-list.component';
import { BulkOnBoradingItemComponent } from './bulk-on-borading-item/bulk-on-borading-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { CoporatesComponent } from './coporates/coporates.component'; 
import { MyPipesModule } from '../../../shared/pipe/PipesModule.module';
 

@NgModule({
  declarations: [
    BulkOnBoradingComponent,
    BulkOnBoradingListComponent,
    BulkOnBoradingItemComponent,  
    CoporatesComponent
  ],
  imports: [
    
  CommonModule,
    BulkOnBoardingRoutingModule, 
    NgxPaginationModule,
    TranslateModule,
    FormsModule, ReactiveFormsModule, 
    MyPipesModule
  ]
})
export class BulkOnBoardingModule { }
