import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-traning/new-training.component';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent
    ],
    exports: [
        
    ]
})
export class TrainingModule { }