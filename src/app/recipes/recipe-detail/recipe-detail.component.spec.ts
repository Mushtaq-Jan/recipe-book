import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, Subject } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';
import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent',() => {
    let fixture: ComponentFixture<RecipeDetailComponent>;
    let mockService: any;
    let router: Router;
    let RECIPES: any;
    let mockActivatedRoute: any;
    let route;
    let newRecipeSub: Subject<Recipe[]>;
    
    beforeEach( () => {
        newRecipeSub = new Subject<Recipe[]>();
        RECIPES = [
            {name: 'Biryani',description: 'Tasty',imagePath: 'pic',ingredients: []},
            {name: 'Noodles',description: 'Yummy',imagePath: 'pic',ingredients: []}]
         
        mockService = jasmine.createSpyObj(['getRecipe','getRecipes','addIngredientsToList','deleteRecipe'],['newRecipe']);
        mockService.newRecipe = newRecipeSub;
        mockActivatedRoute = {
            params: { subscribe: {get: (params: Params) => { return '1'}}}
        }
        let id = [{id: 1}];
        TestBed.configureTestingModule({
            declarations: [RecipeDetailComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {provide: RecipeService, useValue: mockService},
                {
                    provide: ActivatedRoute, 
                    useValue: {
                        mockActivatedRoute 
                }
            }
            ],
            //schemas: [NO_ERRORS_SCHEMA]
        })
        
        fixture = TestBed.createComponent(RecipeDetailComponent);
        router=TestBed.inject(Router);
        //route = TestBed.inject(mockActivatedRoute);
        // mockService.newRecipe.and.returnValue({valueChange: of(RECIPES)});
        //mockService.getRecipe.and.returnValue(of(new Recipe('Maggi','Tasty','Pic',[])));
        // fixture.detectChanges();
        //mockActivatedRoute
        
    })

    it('New Recipe Page navigation test', () => {
        const spy = spyOn(router, 'navigate');
        fixture.componentInstance.onEditRecipe();
        expect(spy.calls.first().args[0]).toContain('edit');
        });

    it('should delete recipe if it is called' ,() => {
         mockService.deleteRecipe.and.returnValue(of(1));
         const spy = spyOn(router, 'navigate');
         fixture.componentInstance.onDeleteRecipe();
         expect(mockService.deleteRecipe).toHaveBeenCalled();
         expect(spy.calls.first().args[0]).toContain('recipes');
    })

    // it('should render correct recipe name',() => {
    //     TestBed.get(mockActivatedRoute)
    //    fixture.detectChanges();
    // })
})