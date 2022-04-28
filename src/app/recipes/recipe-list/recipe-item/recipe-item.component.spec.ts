import { RecipeItemComponent } from './recipe-item.component';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { By } from '@angular/platform-browser';

describe('RecipeItemComponent',() => {

    let fixture: ComponentFixture<RecipeItemComponent>

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [RecipeItemComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(RecipeItemComponent);
    });
    
    it('should have a correct recipe' , () => {
        fixture.componentInstance.recipe = {name: 'Biryani',description: 'Tasty',imagePath: 'pic',ingredients: []};
        expect(fixture.componentInstance.recipe.name).toEqual('Biryani');
    })

    it('should render the recipe name',() => {
        fixture.componentInstance.recipe = {name: 'Biryani',description: 'Tasty',imagePath: 'pic',ingredients: []};
        fixture.detectChanges();

        let debugElement = fixture.debugElement.query(By.css('h4'));
        expect(debugElement.nativeElement.textContent).toContain('Biryani');

        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Biryani');
    })
})