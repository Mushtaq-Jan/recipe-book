import { AlertComponent } from './../alert/alert.component';
import { error } from '@angular/compiler/src/util';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { AuthService, ResponsePayload } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Customer, User } from './user.model';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    
    isLoggedIn = true;
    isLoading = false;
    error: string | null = null;
    @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
    private closeSub!: Subscription;

   customer = new Customer();

    constructor(private authService: AuthService,
                private router: Router,
                private factoryResolver: ComponentFactoryResolver) {}

    onSwitchMode() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
      const email = form.value.email;
      const password = form.value.password;

      let authObservable: Observable<ResponsePayload>;
      this.isLoading = true;
      if(this.isLoggedIn) {
        authObservable =  this.authService.login(email,password)
      }
      else {
        authObservable = this.authService.signUp(email,password)
      }

      authObservable.subscribe(
        responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },
        errorResponse => {
            console.log(errorResponse);
            this.error = errorResponse;
            this.showErrorAlert(errorResponse);
            this.isLoading = false;
        }
    );

      form.reset();
    }

    onHandleError() {
      this.error = null;
    }

    private showErrorAlert(message: string) {
     const alertFactory = this.factoryResolver.resolveComponentFactory(AlertComponent);
     const hostViewContainerRef = this.alertHost.viewContainerRef;
     hostViewContainerRef.clear();

     const componentRef = hostViewContainerRef.createComponent(alertFactory);
     componentRef.instance.message = message;
     this.closeSub = componentRef.instance.close
                 .subscribe(
                      () => {
                      this.closeSub.unsubscribe();
                      hostViewContainerRef.clear();
                      }
              );
       }


       ngOnDestroy() {
           if(this.closeSub) {
             this.closeSub.unsubscribe();
           }
       }
}