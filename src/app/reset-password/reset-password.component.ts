import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ResetPasswordDialogComponent } from '../material-component/dialog/reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.validateAndOpenDialog();
  }

  validateAndOpenDialog() {
    this.resetPasswordService.validateToken(this.token).subscribe((response: any) => {

      this.openResetPasswordDialog();
    }, (error: any) => {
     
      this.snackbarService.openSnackBar(GlobalConstants.invalidToken, GlobalConstants.error);
      this.router.navigate(['/']); // Redirect to the home page or an appropriate page
    })
  }


  openResetPasswordDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';

    // Open the ResetPasswordComponent dialog
    this.dialog.open(ResetPasswordDialogComponent, dialogConfig);
  }


  ngOnInit(): void {
  }


}

