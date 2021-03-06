import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, NgForm, FormControlName } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { error } from '@angular/compiler/src/util';
import { GenericValidator } from './generic-validator';
import { debounceTime, fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  @ViewChild('myForm') myForm!: NgForm;
  recipeForm!: FormGroup;

  
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { 
                  }

  ngOnInit(){
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
          } 
        );
  }

  
  onSubmit() {
    const newRecipe = new Recipe(
                          this.recipeForm.value['name'],
                          this.recipeForm.value['description'],
                          this.recipeForm.value['imagePath'],
                          this.recipeForm.value['ingredients']);
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id,newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.router.navigate(['../'], {relativeTo: this.route});
    return true;
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
             'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]) 
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get name() { return this.recipeForm.get('name'); }
  get imagePathVal() { return this.recipeForm.get('imagePath'); }
  get descriptionVal() { return this.recipeForm.get('description'); }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    return true;
  }

  onDeleteIngredients(index: number) {
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
