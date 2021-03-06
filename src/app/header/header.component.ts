import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeService } from "../recipes/recipe.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit , OnDestroy{
    isAuthenticated = false;
    private userSub!: Subscription;

    constructor(private recipeService: RecipeService,
                private authService: AuthService) {}

    ngOnInit(){
       this.userSub = this.authService.user
                          .subscribe(
                              user => {
                                 this.isAuthenticated = !user ? false : true
                              }
                          )
    }

    onSaveData() {
        this.recipeService.storeRecipes();
    }

    onFetchData() {
        this.recipeService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {
       this.userSub.unsubscribe();
    }
}