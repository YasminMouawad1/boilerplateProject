import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitReviewListComponent } from './limit-review-list/limit-review-list.component';
import { LimitReviewComponent } from './limit-review/limit-review.component';
import { LimitReviewItemComponent } from './limit-review-item/limit-review-item.component';

const routes: Routes = [

  {path:'' , component: LimitReviewComponent , children: [
    { path: '', component: LimitReviewListComponent },
   // { path: '**', component: LimitReviewListComponent },
    { path: 'limit-review-item/:id', component: LimitReviewItemComponent },
   // { path: 'rejected-user', component: UsersListRejectedComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class LimitReviewRoutingModule { }
