import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../../../shared/models/ingredient.model';
import {Recipe} from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-ingredients-list',
  templateUrl: './recipe-ingredients-list.component.html',
  styleUrls: ['./recipe-ingredients-list.component.css']
})
export class RecipeIngredientsListComponent implements OnInit, OnChanges {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.recipe || !this.recipe.ingredients) {
      return;
    }

    this.recipe.ingredients.forEach(i => {
      this.addIngredient(this.createIngredientFormGroup(i));
    });
  }

  get noIngredients(): boolean {
    return (this.recipeFormGroup.get('ingredients') as FormArray).controls.length === 0;
  }

  addIngredient(ingredient: FormGroup) {
    const formArray = this.recipeFormGroup.get('ingredients') as FormArray;
    formArray.push(ingredient ? ingredient : this.createIngredientFormGroup());

    if (!ingredient) {
      this.recipeFormGroup.markAsDirty();
    }
  }

  removeIngredient(control: FormControl) {
    const formArray = (this.recipeFormGroup.get('ingredients') as FormArray);
    const controlIndex = formArray.controls.indexOf(control);

    formArray.removeAt(controlIndex);

    this.recipeFormGroup.markAsDirty();
  }

  private createIngredientFormGroup(ingredient?: Ingredient): FormGroup {
    return new FormGroup({
      name: new FormControl(
        ingredient ? ingredient.name : null,
        [Validators.required]
      ),
      qty: new FormControl(
        ingredient ? ingredient.qty : null,
        [Validators.required]
      ),
      unit: new FormControl(
        ingredient ? ingredient.unit : null,
        [Validators.required]
      ),
      isOwned: new FormControl(
        ingredient ? ingredient.isOwned : false
      )
    });
  }
}
