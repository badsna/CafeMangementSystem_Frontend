import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { error, log } from 'console';
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
    console.log("Home component initialized");
    this.userService.checkToken().subscribe((response:any)=>{
      console.log("Response came from checkToken");

      this.router.navigate(['/cafe/dashboard']);
    },(error:any)=>{
      console.log("Error occurred while checking token");
     console.log(error);
    })
    
  }

  handleSignupAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
    this.dialog.open(SignupComponent,dialogConfig);
  }

  handleForgotPasswordAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
    this.dialog.open(ForgotPasswordComponent,dialogConfig);
  }

  handleLoginAction(){
    console.log("Handling Login Action");
    const dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
    this.dialog.open(LoginComponent,dialogConfig);
  }
}
