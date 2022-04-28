import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {path: '', component: AuthComponent}
  ];
  
@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        SharedModule
    ]
})
export class AuthModule {}