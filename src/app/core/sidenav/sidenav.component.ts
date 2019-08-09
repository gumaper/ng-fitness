import { AuthService } from './../auth/shared/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent { 

    @Output() closeSidenav = new EventEmitter<void>()
    authSubscription: Subscription

    constructor(private authService: AuthService) { }

    onclose() {
        this.closeSidenav.emit()
    }

    onLogout() {
        this.authService.logout()
        this.onclose()
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe()
    }
}