import { TrainingService } from 'src/app/training/shared/training.service';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        AuthRoutingModule
    ],
    providers: [TrainingService]
})
export class AuthModule { }