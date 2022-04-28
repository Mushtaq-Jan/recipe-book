import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface ResponsePayload {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User | any>(null);
    tokenExpirationTime: any;

    constructor(private http: HttpClient,
                private router: Router) {}

    signUp(email: string, password: string) {
     return this.http.post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMM8N6d50SB9guBwn9VKl1NrsTwHf3k_U',
      {
          email: email,
          password: password,
          returnSecureToken: true
      }
      ).pipe(catchError(this.handleError), 
             tap(
               respData => {
                 this.handleAuthentication(
                   respData.email,
                   respData.localId,
                   respData.idToken,
                   +respData.expiresIn
                   );
               }));
    }

    login(email: string, password: string) {
      return  this.http.post<ResponsePayload>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMM8N6d50SB9guBwn9VKl1NrsTwHf3k_U',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), 
        tap(
          respData => {
            this.handleAuthentication(
              respData.email,
              respData.localId,
              respData.idToken,
              +respData.expiresIn
              );
          }));
    }

    autoLogin() {
      const userData: {
         email: string;
         id: string;
         _token: string;
       _tokenExpirationDate: string;
      }  = JSON.parse(localStorage.getItem('userData') || '{}');
      if(!userData) {
        return;
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));
      if(loadedUser.token) {
        this.user.next(loadedUser);
       const expirationTime = new Date(userData._tokenExpirationDate).getTime() -
             new Date().getTime();
        this.autoLogout(expirationTime);
      }
    }

    logout() {
      this.user.next(null);
      this.router.navigate(['auth']);
      localStorage.removeItem('userData');
      if(this.tokenExpirationTime) {
        clearTimeout(this.tokenExpirationTime);
      }
      this.tokenExpirationTime = null;
    }

    autoLogout(expirationTime: number) {
        this.tokenExpirationTime =  setTimeout( () => {
            this.logout();
          },expirationTime);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
      
      const user = new User(
        email,
        userId,
        token,
        expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResp: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if(!errorResp.error || !errorResp.error.error) {
          return throwError(errorMessage);
        }
        switch (errorResp.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already!';  
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;                 
      }
      return throwError(errorMessage);
    }
}