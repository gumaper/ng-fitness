import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material.module';



@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule,
        FormsModule
    ]
})
export class AuthModule { }