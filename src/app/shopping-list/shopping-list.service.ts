import { Injectable, } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
    providedIn: 'root'
})
export class ShoppingListService {
    newIngredients = new Subject<Ingredient[]>();
    onEditing = new Subject<number>();

     ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10)
      ];

      
      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
    }

      addIngredient(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.newIngredients.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
           this.ingredients.push(...ingredients);
           this.newIngredients.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
          this.ingredients[index] = newIngredient;
          this.newIngredients.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
          this.ingredients.splice(index,1);
          this.newIngredients.next(this.ingredients.slice());
      }

   
}