import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from './../shared/exercise.interface';
import { TrainingService } from '../shared/training.service';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html'
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
    
    displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
    dataSource = new MatTableDataSource<Exercise>()
    private exChangedSubscription: Subscription
    
    @ViewChild(MatSort) sort: MatSort
    @ViewChild(MatPaginator) paginator: MatPaginator
    
    constructor(private trainingService: TrainingService) { }
    
    ngOnInit(): void {
        this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
            this.dataSource.data = exercises
        })
        this.trainingService.fetchCompletedOrCancelledExercises()
    }

    ngOnDestroy(): void {
        this.exChangedSubscription.unsubscribe()
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase()
    }
}