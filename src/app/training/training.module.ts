import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-traning/new-training.component';
import { MaterialModule } from '../material.module';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingService } from './shared/training.service';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    exports: [
        
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule
    ],
    entryComponents: [StopTrainingComponent],
    providers: [TrainingService]
})
export class TrainingModule { }