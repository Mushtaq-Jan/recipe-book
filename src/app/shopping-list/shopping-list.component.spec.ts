import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
describe('ShoppingListComponent', () => {

    let fixture: ComponentFixture<ShoppingListComponent>;
    let mockService: any;
    //let shoppingListService: any
    let component: ShoppingListComponent;
    let INGREDIENTS: any;
    let onEditingSub: Subject<number>;
    let newIngredientsSub: Subject<Ingredient[]>;
   
    beforeEach( async(() => {
        INGREDIENTS = [
            {name:'apple',amount:20},
            {name:'tomatoes',amount:15}
        ]
        onEditingSub = new Subject<number>();
        newIngredientsSub = new Subject<Ingredient[]>();
        mockService = jasmine.createSpyObj('ShoppingListService',['getIngredients']);
        mockService.onEditing = onEditingSub;
        mockService.newIngredients = newIngredientsSub;
        TestBed.configureTestingModule({
            declarations: [ShoppingListComponent],
            providers: [
                {provide: ShoppingListService, useValue: mockService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        // mockService.newIngredientsSub.and.returnValue(new Subject<Ingredient[]>());
        // mockService.newIngredientsSub.subscribe(
        //     (ingredients: any) => {
        //         INGREDIENTS = ingredients;
        //       }
        // )
        fixture = TestBed.createComponent(ShoppingListComponent);
        component = fixture.componentInstance;
        //shoppingListService = TestBed.inject(ShoppingListService);

        fixture.detectChanges();
    }));

    // it('should emit index if onEditting is called', () => {
       
    //     mockService.onEditingSub.and.returnValue(new Subject<number>());      
    //     fixture.detectChanges();
    //     mockService.onEditingSub.subscribe(
    //         (index: number) => {
    //             expect(index).toBe(1)
    //         }
    //     );
    //     component.onEditItem(1);
    // })
    
    // it('should get ingredients correctly from service', () => {
    //     mockService.getIngredients.and.returnValue(of(INGREDIENTS))
    //     fixture.detectChanges();
    //     expect(component.ingredients.length).toBe(2);
    // })
})