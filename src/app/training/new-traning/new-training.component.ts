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
    exerciseSubscription: Subscription
    
    constructor(private trainingService: TrainingService) { }
    
    ngOnInit(): void {
        this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises)
        this.trainingService.fetchAvailableExercises()
    }

    
    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise)
    }
    
    ngOnDestroy(): void {
        this.exerciseSubscription.unsubscribe()
    }
}