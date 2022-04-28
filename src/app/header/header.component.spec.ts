import { AuthService } from './../auth/auth.service';
import { of, Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';
import { HeaderComponent } from "./header.component"

describe('HeaderComponent', () => { 

    let component: HeaderComponent;
    let isAuthenticated: boolean;
    let userSub: Subscription;
    let mockRecipeService: any;
    let mockAuthService: any;

    beforeEach( () => {
         mockRecipeService = jasmine.createSpyObj(RecipeService,['storeRecipes','fetchRecipes'])
         mockAuthService = jasmine.createSpyObj(AuthService,['logout'])
         component = new HeaderComponent(mockRecipeService,mockAuthService);
    })

    describe('onSaveData',() => {
        it('should call store recipes',() => {
            mockRecipeService.storeRecipes.and.returnValue(of(true))
            component.onSaveData();
            expect(mockRecipeService.storeRecipes).toHaveBeenCalled();
        })
    })

    describe('onFetchData',() => {
        it('should call store recipes',() => {
            mockRecipeService.fetchRecipes.and.returnValue(of(true))
            component.onFetchData();
            expect(mockRecipeService.fetchRecipes).toHaveBeenCalled();
        })
    })

    describe('onLogout',() => {
        it('should call logout',() => {
            mockAuthService.logout.and.returnValue(of(true))
            component.onLogout();
            expect(mockAuthService.logout).toHaveBeenCalled();
        })
    })

 })