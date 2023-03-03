import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../../../shared/animations/rouuting';

@Component({
  selector: 'app-users-approval',
  templateUrl: './users-approval.component.html',
  animations:[routingAnimation]

})
export class UsersApprovalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
