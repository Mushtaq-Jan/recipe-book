import { Ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  
  ingredients!: Ingredient[];
  subscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();
   this.subscription = this.shoppingListService.newIngredients
       .subscribe(
          (ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
          }
       );
  }

  onEditItem(index: number) {
    this.shoppingListService.onEditing.next(index);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
