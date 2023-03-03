import { Component, OnInit } from '@angular/core';
import { routingAnimation } from 'projects/public/src/app/shared/animations/rouuting';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  animations:[routingAnimation]
})
export class CustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
