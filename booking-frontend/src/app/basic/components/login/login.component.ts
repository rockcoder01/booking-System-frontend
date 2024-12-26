import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,

  ){

  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  submitForm(){
    this.authService.login(this.validateForm.value['email'], this.validateForm.value['password']).subscribe((res)=>{
      this.notification.success('SUCCESS', 'signup successfully', {nzDuration: 5000})
    },
    (error)=>{
      this.notification.error('ERROR', 'some issue on Signup', {nzDuration: 5000})
    }
  )
  }
}
