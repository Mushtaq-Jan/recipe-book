import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
   let service: RecipeService
   let mockShoppingListService: any
   let http: HttpClient
   let recipesTest1: Recipe;
   beforeEach(() => {
      mockShoppingListService = jasmine.createSpyObj('ShoppingListService',['addIngredients'])
       service = new RecipeService(http,mockShoppingListService);
       recipesTest1 = new Recipe
       ('Maggi Noodles',
       'Very Tasty',
       'https://i0.wp.com/vegecravings.com/wp-content/uploads/2020/01/Vegetable-Masala-Maggi-Recipe-Step-By-Step-Instructions-scaled.jpg?resize=2048%2C1799&quality=65&strip=all&ssl=1',
       [])
       service.addRecipe(recipesTest1);
   })

   it('should have two initial recipes',() => {
      expect(service.getRecipes().length).toBe(1);
   })

   it('should add recipes when it is called',() => {
      let recipesTest2: Recipe;
      recipesTest2 = new Recipe
                       ('Nasi Goreng',
                       'Delicious',
                       'https://i0.wp.com/vegecravings.com/wp-content/uploads/2020/01/Vegetable-Masala-Maggi-Recipe-Step-By-Step-Instructions-scaled.jpg?resize=2048%2C1799&quality=65&strip=all&ssl=1',
                       [])
      service.addRecipe(recipesTest2)
      //service.addRecipe(recipesTest2);
      expect(service.recipes.length).toBe(2);
   })

   it('should get recipes as per index',() => {
      service.getRecipe(0);
      expect(service.recipes[0].name).toEqual('Maggi Noodles')
   })

   it('should delete recipe',() => {
      service.deleteRecipe(0);
      expect(service.recipes.length).toBe(0);
   })
   
   it('should update recipe',() => {
      let recipesTest2: Recipe;
      recipesTest2 = new Recipe
                       ('Nasi Goreng',
                       'Delicious',
                       'https://i0.wp.com/vegecravings.com/wp-content/uploads/2020/01/Vegetable-Masala-Maggi-Recipe-Step-By-Step-Instructions-scaled.jpg?resize=2048%2C1799&quality=65&strip=all&ssl=1',
                       [])
      service.updateRecipe(0,recipesTest2);
      expect(service.recipes[0].name).toEqual('Nasi Goreng');
   })
})