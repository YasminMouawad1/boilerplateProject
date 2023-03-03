import { Component, OnInit } from '@angular/core';
import { routingAnimation } from 'projects/public/src/app/shared/animations/rouuting';

@Component({
  selector: 'app-bulk-on-borading',
  templateUrl: './bulk-on-borading.component.html',
  animations:[routingAnimation]
})
export class BulkOnBoradingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
