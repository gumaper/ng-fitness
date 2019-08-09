import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from './../shared/training.service';
import { Exercise } from '../shared/exercise.interface';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
    exercises: Exercise[] = []
    
    constructor(private trainingService: TrainingService) { }
    
    ngOnInit(): void {
        this.exercises = this.trainingService.getAvailableExercises()
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise)
    }
 }