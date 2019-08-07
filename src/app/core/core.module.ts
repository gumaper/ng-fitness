import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
    declarations: [
        WelcomeComponent,
        HeaderComponent,
        SidenavComponent,
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        HeaderComponent,
        SidenavComponent
    ]
})
export class CoreModule { }