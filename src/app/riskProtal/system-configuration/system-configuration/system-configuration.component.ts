import { Component, OnInit } from '@angular/core';
import { routingAnimation } from 'projects/public/src/app/shared/animations/rouuting';

@Component({
  selector: 'app-system-configuration',
  templateUrl: './system-configuration.component.html',
  animations:[routingAnimation]
})
export class SystemConfigurationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
