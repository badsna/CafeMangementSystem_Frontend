import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { validateBasis } from '@angular/flex-layout';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password = true;
  confirmPassword = true;

  signupForm: any = FormGroup;
  responseMessage: any;


  constructor(
    private formBulider: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<SignupComponent>,
    private ngService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBulider.group(
      {
        //initial value and validators
        name: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
        email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
        contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
        password:[null,[Validators.required]],
        confirmPassword:[null,[Validators.required]]
      });
  }

  validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }
    else{
      return false;
    }
  }

  //html button bata yo hit hunxa
  handleSubmit(){
    this.ngService.start();
    var formData=this.signupForm.value;
    //form bata data lene
    var data={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password,
    }

    //api hit hanxa signup(data) vanne method user.service.ts ma xa jasley api ko response lai return garxa
    this.userService.signup(data).subscribe(
      //everything is good
      (response:any)=>{

      this.ngService.stop();
      this.dialogRef.close();
      this.responseMessage=response?.message;

      //opening snackbar with responseMessage
      this.snackbarService.openSnackBar(this.responseMessage,"");
      this.router.navigate(['/']);
    },
    //something is wrong while making http request
    (error)=>{
      this.ngService.stop();
      //if error message in response to http request
      if(error.error?.message){
        this.responseMessage=error.error?.message;
      }

      //if no error message in response
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
     }
}
