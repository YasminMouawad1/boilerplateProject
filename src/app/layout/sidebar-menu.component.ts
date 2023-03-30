import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MenuItem} from '@shared/layout/menu-item';

@Component({
    selector: 'sidebar-menu',
    styleUrls:['./sidebar-menu.component.css'],
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/about';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);
        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    getMenuItems(): MenuItem[] {
        return [ 

            // new MenuItem(this.l('About'), '/app/about', 'fas fa-info-circle')
            // new MenuItem(
            //             'Home',
            //             'https://aspnetboilerplate.com?ref=abptmpl',
            //             'far fa-circle'
            //         ),

            new MenuItem(this.l('[Admin]'), '', 'fas fa-screwdriver-wrench', '', [
                new MenuItem('About', '/app/about', 'fas fa-info-circle'),
                new MenuItem('HomePage', '/app/home', 'fas fa-home'), 
                new MenuItem('Roles', '/app/roles', 'fas fa-theater-masks','Pages.Roles'), 
                new MenuItem('Tenants', '/app/tenants', 'fas fa-building', 'Pages.Tenants'), 
                new MenuItem('Users', '/app/users', 'fas fa-users', 'Pages.Users'), 
            ]),  

              
            new MenuItem(this.l('[Operational Portal]'), '', 'fas fa-layer-group', '', [
                    new MenuItem('Merchant settlement', '/app/merchant-settlement', 'fas fa-users-gear'),
                    new MenuItem('BulkOnBoarding', '/app/bulk-on-boarding', 'fas fa-id-card'), 
                    new MenuItem('Merchants Due Transactions','/app/due-transactions','fas fa-money-bill-wave'), 
                    new MenuItem('Activation Point','/app/activation-point','fa-solid fa-location-dot'), 
                    new MenuItem('registration-users', '/app/registration-users','fas fa-users'),


            ]), 
            new MenuItem(this.l('[System Configuration]'), '', 'fas fa-gears', '', [ 
                new MenuItem('Message Type','/app/message-type','fas fa-envelope'),
                new MenuItem('Message Template','/app/message-template','fas fa-envelope-open-text'),
                new MenuItem('Email Type','/app/email-type','fas fa-envelope'),
                new MenuItem('Email content','/app/create-email','fas fa-envelope-open-text'),

        ]), 
    
            

            new MenuItem(this.l('[Risk Portal]'), '', 'fas fa-toolbox', '', [
                new MenuItem('Users Approval', '/app/users-approval', 'fas fa-user-check'),
                new MenuItem(this.l('Rejected Requests'), '', 'fas fa-user-minus', '', [
                    new MenuItem('Soft reject', '/app/users-softRejected', 'fas fa-user-slash'),
                    new MenuItem('system Reject', '/app/users-systemRejected', 'fas fa-user-slash'),
                    new MenuItem('hard Rejected', '/app/users-hardRejected', 'fas fa-user-slash')
                ]),

                new MenuItem('Limit Review', '/app/limit-review', 'fa-solid fa-id-card'),

                // new MenuItem(this.l('System Configuration'), '', 'fas fa-users-gear', '', [
                //     new MenuItem('core configuration', '/app/system-configuration', 'fas fa-users-gear'),
                //     new MenuItem('Rejection Reasons', '/app/system-rejection-reasons', 'fas fa-dot-circle'),
                //     new MenuItem('configuration professions', '/app/system-configuration-professions', 'fas fa-dot-circle')
                // ]),
                
                new MenuItem(this.l('bulk-on-boaring'), '', 'fas fa-id-card', '', [ 
                    new MenuItem('Bulk on borading', '/app/bulk-onborading', 'fas fa-id-card'),
                    new MenuItem('Coporates', '/app/coporates', 'fas fa-store')
                ]),

                new MenuItem('Customers', '/app/customers', 'fas fa-users'), 

            ]), 

            

           
        ];
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}
