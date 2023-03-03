import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../../../shared/animations/rouuting';

@Component({
  selector: 'app-users-approval',
  templateUrl: './users-reject.component.html',
  animations:[routingAnimation]

})
export class UsersRejectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
