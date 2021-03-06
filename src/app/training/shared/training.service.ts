import { UIService } from './../../core/auth/shared/ui.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Exercise } from './exercise.interface';

@Injectable()
export class TrainingService {

    exerciseChanged = new Subject<Exercise>()
    exercisesChanged = new Subject<Exercise[]>()
    finishedExercisesChanged = new Subject<Exercise[]>()
    private availableExercises: Exercise[] = []
    private runningExercise: Exercise
    private fbSubs: Subscription[] = []

    constructor(
        private fs: AngularFirestore,
        private uiService: UIService
    ) { }

    fetchAvailableExercises() {
        this.fbSubs.push(this.fs
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map(docArray => {
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            name: doc.payload.doc.data()['name'],
                            duration: doc.payload.doc.data()['duration'],
                            calories: doc.payload.doc.data()['calories']
                        }
                    })
                })
            )
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises
                this.exercisesChanged.next([...this.availableExercises])
            }, error => {
                this.uiService.loadingStateChanged.next(false)
                this.uiService.showSnackbar(error.message, null, 3000)
                this.exerciseChanged.next(null)
            }))
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(
            ex => ex.id == selectedId
        )
        this.exerciseChanged.next({...this.runningExercise})
    }

    completeExercise() {
        this.addDataToDatabase({ 
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed' 
        })
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({ 
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100), 
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(), 
            state: 'cancelled' 
        })
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    getRunningExercise() {
        return { ...this.runningExercise }
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.fs.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises)
        }))
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe())
    }

    private addDataToDatabase(exercise: Exercise) {
        this.fs.collection('finishedExercises').add(exercise)
    }
 }