import { Component, OnInit } from '@angular/core';
import { AuthService } from './basic/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'booking-frontend';
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;
  isLoginUser: boolean = false;
  isLoginClient: boolean = false;
  isLoginCompany: boolean = false;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
      this.isLoginUser = this.authService.getLoginUser();
      this.isLoginClient = this.authService.getLoginClient();
      this.isLoginCompany = this.authService.getLoginCompany();
      console.log(this.isLoginClient, this.isLoginCompany);
      

  }
}
