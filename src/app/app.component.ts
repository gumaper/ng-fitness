import { AuthService } from './core/auth/shared/auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fitness';

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.authService.initAuthListener()
  }
}
