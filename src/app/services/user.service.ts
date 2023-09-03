import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url=environment.apiUrl;


  constructor(private httpClient:HttpClient) { }

  signup(data:any){
    return this.httpClient.post(this.url+
      "/user/signup",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+
      "/user/forgotPassword",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      })
  }

  login(data:any){
    return this.httpClient.post(this.url+
      "/user/login",data,{
        headers:new HttpHeaders().set('Content-Type','application/json')
      })
  }
  
  checkToken(): Observable<any> {
    return this.httpClient.get(this.url + '/user/checkToken').pipe(
      catchError((error: any) => {
        // Handle the error response here
        if (error.status === 401) {
          console.log("hello checkToken")
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
