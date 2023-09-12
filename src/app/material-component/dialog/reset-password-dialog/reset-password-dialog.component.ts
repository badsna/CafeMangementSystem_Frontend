import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent implements OnInit {
  password = false;
  confirmPassword = false;
  token = '';

  resetPasswordForm: FormGroup | any;
  responseMessage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<ResetPasswordDialogComponent>
  ) { 
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }
  validateSubmit(): boolean {
    return this.resetPasswordForm.controls['password'].value !== this.resetPasswordForm.controls['confirmPassword'].value;
  }

  passwordReset(): void {
    console.log("Clicked passwordReset");
    this.ngxService.start();
    const formData = this.resetPasswordForm.value;

    const data = {
      newPassword: formData.password,
      token: this.token
    };

    console.log(data);
    this.resetPasswordService.update(data).subscribe((response: any) => {
      console.log("inside yes");
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      this.router.navigate(['/']);
      this.dialogRef.close();

    }, (error: any) => {
      console.log("inside no");
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.invalidToken;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
