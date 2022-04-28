import { RecipeEditComponent } from './recipe-edit.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditGuard implements CanDeactivate<RecipeEditComponent> {
  
  canDeactivate(
    component: RecipeEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.recipeForm.dirty && !component.myForm.submitted) {
        const recipeName = component.recipeForm.get('name')?.value || 'New Recipe'
        return confirm(`Navigate away and lose all changes to ${recipeName}?`);
      }
      return true;
  }
  
}
