import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

describe('ShoppingListService',() => {
   let service: ShoppingListService;

   beforeEach( () => {
       service = new ShoppingListService();
   })

   it('should have two pre-saved ingredients',() => {
       expect(service.ingredients.length).toBe(2);
   })

   it('should add new ingredient when add called',() => {
       service.addIngredient(new Ingredient('Bread',10));
       expect(service.ingredients.length).toBe(3);
   })

   it('should get exact ingredient when getIngredient index called' , () => {
       service.getIngredient(1);
       expect(service.ingredients[1].name).toEqual('Tomatoes');
   })

   it('should delete ingredient based on index ', () => {
       service.deleteIngredient(2);
       expect(service.ingredients.length).toBe(2);
   })

})