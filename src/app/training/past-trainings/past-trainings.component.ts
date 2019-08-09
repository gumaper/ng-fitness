import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Exercise } from './../shared/exercise.interface';
import { TrainingService } from '../shared/training.service';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html'
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
    
    displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
    dataSource = new MatTableDataSource<Exercise>()
    
    @ViewChild(MatSort) sort: MatSort
    @ViewChild(MatPaginator) paginator: MatPaginator
    
    constructor(private trainingService: TrainingService) { }
    
    ngOnInit(): void {
        this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase()
    }
}