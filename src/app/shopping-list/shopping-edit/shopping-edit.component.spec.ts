import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';
import { ShoppingEditComponent } from './shopping-edit.component';

describe('ShoppingEditComponent', () => {

    let component: ShoppingEditComponent;
    let ingredients: any;
    let mockService: any;

    beforeEach( () => {
        ingredients = [
            {name: 'Apples', amount:5},
            {name: 'Tomatoes',amount:10},
            {name: 'Bread', amount:20}
          ];

        mockService = jasmine.createSpyObj(ShoppingListService,['deleteIngredient']);

        component = new ShoppingEditComponent(mockService);
    })


    
})