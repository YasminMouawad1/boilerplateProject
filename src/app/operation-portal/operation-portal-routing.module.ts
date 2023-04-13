import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { OperationPortalComponent } from './operation-portal.component';

import{BulkComponent} from './bulkOnBoarding/bulk.component';
import {MerchantComponent} from './merchantSettlement/merchantSettlement.component';
import {ActivationPointComponent} from './activationPoint/activation-point.component';
import {RegistrationUserComponent} from './RegistrationUsers/RegistrationUsers.component';
import {DueTransactionComponent} from './dueTransactions/dueTransactions.component';
import {AcceptClaimsListComponent} from './acceptClaims/accept-claims-list.component';
import {AcceptedClaimsComponent} from './acceptClaims/accepted-claims/accepted-claims.component';
import { PortalUsersComponent } from './RegistrationUsers/portal-users-list/portal-users-list.component';
import { PurchaseUsersComponent } from './RegistrationUsers/purchase-users-list/purchase-users-list.component';
import { MerchantActivatorsComponent } from './RegistrationUsers/merchant-activators/merchant-activators.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: OperationPortalComponent,
                children: [
                    { path: 'bulk-on-boarding', component: BulkComponent, canActivate: [AppRouteGuard] },
                    { path: 'merchant-settlement', component: MerchantComponent, canActivate: [AppRouteGuard] },
                    { path: 'activation-point', component: ActivationPointComponent, canActivate: [AppRouteGuard] },
                    { path: 'registration-users', component: RegistrationUserComponent, canActivate: [AppRouteGuard] },
                    { path: 'portal-users', component: PortalUsersComponent, canActivate: [AppRouteGuard] },
                    { path: 'purchase-users', component: PurchaseUsersComponent, canActivate: [AppRouteGuard] },
                    { path: 'merchant-activators', component: MerchantActivatorsComponent, canActivate: [AppRouteGuard] },
                    { path: 'due-transactions', component: DueTransactionComponent, canActivate: [AppRouteGuard] },
                    { path: 'accept-claims', component: AcceptClaimsListComponent, canActivate: [AppRouteGuard] },
                    { path: 'accepted-claims', component: AcceptedClaimsComponent, canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class OperationPortalRoutingModule { }
