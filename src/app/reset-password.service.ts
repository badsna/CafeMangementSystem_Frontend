import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  update(data: { newPassword: any; token: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
