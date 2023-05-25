import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRouteGuard } from '@shared/auth/auth-route-guard'; 

import { RiskPortalComponent } from './risk-portal.component';
 import { PendingListComponent } from './pending/pending-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DetailsItemComponent } from './details/detailsItem.component';
import { SetonlineAgainstComponent } from './online-against/set-online-against.component';
import { IncomeComponent } from './scoring-parameters/income/income.component';
import { RestrictedIscoreComponent } from './scoring-parameters/restricted-iscore/restricted-iscore.component';
import { RestrictedProfissionComponent } from './scoring-parameters/restricted-profission/restricted-profission.component';
 

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RiskPortalComponent,
                children: [
                    { path: 'pending', component: PendingListComponent, canActivate: [AppRouteGuard] },
                    { path: 'confirmation', component: ConfirmationComponent, canActivate: [AppRouteGuard] },
                    { path: 'details-item/:id', component: DetailsItemComponent, canActivate: [AppRouteGuard] },
                    { path: 'set-online-against', component: SetonlineAgainstComponent, canActivate: [AppRouteGuard] },
                    {path: 'income', component: IncomeComponent, canActivate: [AppRouteGuard]},
                    {path: 'restricted-iscore', component: RestrictedIscoreComponent,canActivate: [AppRouteGuard] },
                    {path: 'restricted-profission', component: RestrictedProfissionComponent,canActivate: [AppRouteGuard] }

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class RiskPortalRoutingModule { }
