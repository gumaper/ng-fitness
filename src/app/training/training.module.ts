import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-traning/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../core/shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingService } from './shared/training.service';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRoutingModule
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }