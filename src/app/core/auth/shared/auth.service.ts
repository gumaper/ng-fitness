import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TrainingService } from 'src/app/training/shared/training.service';



@Injectable({ providedIn: 'root' })
export class AuthService {

    authChange = new Subject<boolean>()
    private isAuthenticated = false

    constructor(
        private router: Router, 
        private angularFireAuth: AngularFireAuth, 
        private trainingService: TrainingService
    ) { }

    initAuthListener() {
        this.angularFireAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true
                this.authChange.next(true)
                this.router.navigate(['/training'])
            } else {
                this.trainingService.cancelSubscriptions()
                this.authChange.next(false)
                this.router.navigate(['/login'])
                this.isAuthenticated = false
            }
        })
    }

    registerUser(authData: AuthData) {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
            })
            .catch(error => {
                console.log(error)
            })
    }

    login(authData: AuthData) {
        this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
        })
        .catch(error => {
            console.log(error)
        })
    }

    logout() {
        this.angularFireAuth.auth.signOut()
    }

    isAuth() {
        return this.isAuthenticated
    }

}