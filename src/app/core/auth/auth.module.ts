import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from './../../material.module';




@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class AuthModule { }