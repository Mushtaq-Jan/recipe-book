import { SelectiveStrategy } from './recipes/selective-strategy.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', 
    data: {preload: true},
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipeModule)
  },
  {
    path: 'shopping-list', 
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectiveStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
