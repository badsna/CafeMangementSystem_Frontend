import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  @ViewChild('userInfoRef', { static: false }) userInfoRef: ElementRef | any;

  ngAfterViewInit() {
    // Get the content width
    const contentWidth = this.userInfoRef.nativeElement.offsetWidth;

    // Calculate the margin value (content width + 100px)
    const marginValue = contentWidth + 100;

    // Apply the margin-left
    this.renderer.setStyle(this.userInfoRef.nativeElement, 'marginLeft', `-${marginValue}px`);
  }
  
  token: any;
  tokenPayload: any;
  userName: any;


  role: any
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {
    this.token = localStorage.getItem('token');
    this.tokenPayload = jwt_decode(this.token);
    this.userName = this.tokenPayload?.sub;
  }


  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };
    const dailogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dailogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      dailogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
