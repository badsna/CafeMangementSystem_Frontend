import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
 
url=environment.apiUrl;

  constructor(
    private httpClient:HttpClient
  ) { }

  update(data:any){
    console.log("inside update")
    return this.httpClient.post(this.url
      +"/resetToken/update",data,{
      headers:new HttpHeaders().set("Content-Type",'application/json')
    })
  }

   
  validateToken(token:any): Observable<any> {
    console.log("inside validatetoken")
    return this.httpClient.get(this.url + '/resetToken/validate/'+token).pipe(
      catchError((error: any) => {
        // Handle the error response here
        if (error.status === 401) {
          // Throw a custom exception for unauthorized access
          throw new DOMException('Unauthorized access. Please log in.');
        } else {
          // Handle other error cases or return a different custom exception
          // You can customize this based on your backend response structure
          throw new DOMException('An error occurred while checking the token.');
        }
      })
    );
  }

}
