import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent { 

    @Output() closeSidenav = new EventEmitter<void>()

    onclose() {
        this.closeSidenav.emit()
    }
}