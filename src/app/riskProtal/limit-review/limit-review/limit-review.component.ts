import { Component, OnInit } from '@angular/core';
import { routingAnimation } from 'projects/public/src/app/shared/animations/rouuting';

@Component({
  selector: 'app-limit-review',
  templateUrl: './limit-review.component.html',
  animations:[routingAnimation]
})
export class LimitReviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
