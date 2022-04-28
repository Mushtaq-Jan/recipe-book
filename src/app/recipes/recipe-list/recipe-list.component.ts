import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{
    
    recipes!: Recipe[];
    subscription!: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  // private _listFilter: string = '';
  // get listFilter(): string {
  //   return this._listFilter;
  // }
  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   this.filteredRecipes = this.listFilter ? this.performFilter(this.listFilter) : this.recipes;
  // }

  // filteredRecipes!: Recipe[];

  ngOnInit() {
   this.subscription = this.recipeService.newRecipe
           .subscribe(
             (recipes: Recipe[]) => {
               this.recipes = recipes;
             }
           )
    this.recipes = this.recipeService.getRecipes();
   
  }

  performFilter(filterBy: string): Recipe[] {
    filterBy = filterBy.toLowerCase();
    return this.recipes.filter(
      (recipe: Recipe) => {
        recipe.name.toLowerCase().includes(filterBy);
      })
  }

  onNewRecipe() {
     this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
