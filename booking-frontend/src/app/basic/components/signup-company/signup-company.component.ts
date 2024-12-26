import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrls: ['./signup-company.component.css']
})
export class SignupCompanyComponent {
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
      name: [null],
      lastname: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]],
    })
  }

  submitForm(){
    this.authService.registerCompany(this.validateForm.value).subscribe((res)=>{
      this.notification.success('SUCCESS', 'signup successfully', {nzDuration: 5000})
    },
    (error)=>{
      this.notification.error('ERROR', 'some issue on Signup', {nzDuration: 5000})
    }
  )
  }
}
