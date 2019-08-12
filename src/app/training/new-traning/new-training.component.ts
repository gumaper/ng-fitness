import { UIService } from './../../core/auth/shared/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from './../shared/training.service';
import { Exercise } from '../shared/exercise.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises: Exercise[]
    isLoading: boolean = false
    private exerciseSubscription: Subscription
    private loadingSubscription: Subscription
    
    constructor(private trainingService: TrainingService, private uiService: UIService) { }
    
    ngOnInit(): void {
        this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
            isLoading => {
                this.isLoading = isLoading
        })
        this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
            exercises => {
                this.exercises = exercises
            }
        )
        this.fetchExercises()
    }

    fetchExercises() {
        this.trainingService.fetchAvailableExercises()
    }
    
    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise)
    }
    
    ngOnDestroy(): void {
        if (this.exerciseSubscription) {
            this.exerciseSubscription.unsubscribe()
        }
        if (this.loadingSubscription) {
            this.loadingSubscription.unsubscribe()
        }
    }
}