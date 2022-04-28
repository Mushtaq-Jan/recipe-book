import { HttpClient, HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { exhaustMap, map, Subject, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    newRecipe: Subject<Recipe[]> = new Subject<Recipe[]>();
    newIngredient: Subject<Ingredient> = new Subject<Ingredient>();
     recipes: Recipe[] = [
        // new Recipe(
        //     'Maggi Noodles',
        //     'Very Tasty',
        //     'https://i0.wp.com/vegecravings.com/wp-content/uploads/2020/01/Vegetable-Masala-Maggi-Recipe-Step-By-Step-Instructions-scaled.jpg?resize=2048%2C1799&quality=65&strip=all&ssl=1',
        //     [
        //         new Ingredient('Masala',5),
        //         new Ingredient('Mixed vegtables',5)
        //     ]),
        //     new Recipe(
        //         'Nasi Goreng',
        //         'Delicious',
        //         'https://i.guim.co.uk/img/media/535c66550edac692c9c3b6fe84184085eb2ee2ab/0_1267_8815_5290/master/8815.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b05400cf0930fe6aa7b90944110fc319',
        //         [
        //             new Ingredient('Meat',20),
        //             new Ingredient('Mixed vegtables',15)
        //         ]) 
      ];

      constructor(private http: HttpClient,
                  private shoppingListService: ShoppingListService) { }

      setRecipes(recipes: Recipe[]) {
         this.recipes = recipes;
         this.newRecipe.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToList(ingredients: Ingredient[]) {
          this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
         this.recipes.push(recipe);
         this.newRecipe.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.newRecipe.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index,1);
          this.newRecipe.next(this.recipes.slice());
      }

      //Firbase Storage Service
      //Firebase URL: https://recipe-book-b0f1f-default-rtdb.firebaseio.com/recipes.json

      storeRecipes() {
        const recipes = this.getRecipes();
        this.http.put('https://recipe-book-b0f1f-default-rtdb.firebaseio.com/recipes.json',recipes)
                .subscribe(
                    response => {
                        console.log(response);
                    }
                );
      }

      fetchRecipes() {     
                    return this.http.get<Recipe[]>(
                        'https://recipe-book-b0f1f-default-rtdb.firebaseio.com/recipes.json'
                       )
                       .pipe( 
                        map(
                        recipes => {
                                  return recipes.map(
                                  recipe => {
                                  return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                                  }
                              );
                          }
                      ),
                      tap(
                          recipes => {
                          this.setRecipes(recipes);
                          })               
                      )
              }
}

