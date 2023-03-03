import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { GetCustomersRoutingModule } from './get-customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerItemComponent } from './customer-item/customer-item.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomersListComponent,
    CustomerItemComponent
  ],
  imports: [
    CommonModule,
    GetCustomersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxPaginationModule
  ]
})
export class GetCustomersModule { }
