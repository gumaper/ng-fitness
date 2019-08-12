import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './shared/training.service';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit, OnDestroy {
    
    ongoingTraining = false
    exerciseSubscription: Subscription

    constructor(private trainingService: TrainingService) { }

    ngOnInit(): void {
        this.exerciseSubscription = this.trainingService.exerciseChanged
            .subscribe(exercise => {
                if (exercise) {
                    this.ongoingTraining = true
                } else {
                    this.ongoingTraining = false
                }
            })
    }

    ngOnDestroy() {
        if (this.exerciseSubscription) {
            this.exerciseSubscription.unsubscribe()
        }
    }
}