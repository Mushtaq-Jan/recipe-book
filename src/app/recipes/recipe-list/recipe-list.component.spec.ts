import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { RecipeListComponent } from './recipe-list.component';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { of, Subject } from 'rxjs';
import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { By } from '@angular/platform-browser';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

describe('RecipeListComponent',() => {
    let fixture: ComponentFixture<RecipeListComponent>;
    let mockService: any;
    let router: Router;
    let RECIPES: any;
    let newRecipeSub: Subject<Recipe[]>;

    beforeEach( () => {
        newRecipeSub = new Subject<Recipe[]>();
        RECIPES = [
            {name: 'Biryani',description: 'Tasty',imagePath: 'pic',ingredients: []},
            {name: 'Noodles',description: 'Yummy',imagePath: 'pic',ingredients: []}]
       
        mockService = jasmine.createSpyObj(['getRecipes'],['newRecipe']);
        mockService.newRecipe = newRecipeSub;
        TestBed.configureTestingModule({
            declarations: [RecipeListComponent,RecipeItemComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {provide: RecipeService, useValue: mockService},
                //{provide: Router, useValue: }
            ],
            //schemas: [NO_ERRORS_SCHEMA]
        })
        
        fixture = TestBed.createComponent(RecipeListComponent);
        router=TestBed.inject(Router);
        // mockService.newRecipe.and.returnValue({valueChange: of(RECIPES)});
        // mockService.getRecipes.and.returnValue(of(RECIPES));
        // fixture.detectChanges();
        
    })

    it('just test',() => {
        expect(true).toBe(true);
    })

    // it('should set recipes',() => {
    //     mockService.getRecipes.and.returnValue(of(RECIPES));
    //     fixture.detectChanges();
    //     expect(fixture.componentInstance.recipes.length).toBe(2);
    // })

    it('New Recipe Page navigation test', () => {
        const spy = spyOn(router, 'navigate');
        fixture.componentInstance.onNewRecipe();
        expect(spy.calls.first().args[0]).toContain('new');
        });
 
    // it('should create one list for each recipes',() => {
    
    //     mockService.getRecipes.and.returnValue(of(RECIPES));
    //     fixture.componentInstance.ngOnInit();
    //     expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(2);
    // })
    
})