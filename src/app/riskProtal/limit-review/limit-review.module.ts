import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitReviewRoutingModule } from './limit-review-routing.module';
import { LimitReviewListComponent } from './limit-review-list/limit-review-list.component';
import { LimitReviewComponent } from './limit-review/limit-review.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';
import { LimitReviewItemComponent } from './limit-review-item/limit-review-item.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LimitReviewListComponent,
    LimitReviewComponent,
    LimitReviewItemComponent
  ],
  imports: [
    CommonModule,
    LimitReviewRoutingModule,
    NgxPaginationModule,
    TranslateModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LimitReviewModule { }
