import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { error, log } from 'console';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog,
    //for checking token
    private userService:UserService,
    private router:Router
    ) { }

  ngOnInit(): void {
    //Direct to cafe/dashboard if token is available
    this.userService.checkToken().subscribe((response:any)=>{
      this.router.navigate(['/cafe/dashboard']);
    },(error:any)=>{
     console.log(error);
    })
    
  }

  handleSignupAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
    //opening Signup form as dialog
    this.dialog.open(SignupComponent,dialogConfig);
  }

  handleForgotPasswordAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
        //opening ForgotPassword form as dialog
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }

  handleLoginAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
        //opening Login form as dialog
    this.dialog.open(LoginComponent,dialogConfig);
  }

}
