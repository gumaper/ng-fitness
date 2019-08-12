import { UIService } from './ui.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';
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
        private trainingService: TrainingService,
        private uiService: UIService
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
        this.uiService.loadingStateChanged.next(true)
        this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiService.loadingStateChanged.next(false)
            })
            .catch(error => {
                this.uiService.loadingStateChanged.next(false)
                this.uiService.showSnackbar(error.message, null, 3000)
            })
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true)
        this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false)
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false)
            this.uiService.showSnackbar(error.message, null, 3000)
        })
    }

    logout() {
        this.angularFireAuth.auth.signOut()
    }

    isAuth() {
        return this.isAuthenticated
    }

}