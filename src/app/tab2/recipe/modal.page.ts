import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ModalController } from '@ionic/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() recipe: Recipe;
  public recipeForm: FormGroup;

  lastInputSelected = false;
  wasSaved: boolean;

  constructor(private modal: ModalController) { }

  ngOnInit() {

    this.recipeForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      information: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([])
    });

    console.log(this.recipe);
  }

  onSubmit() {

    if (!this.verifyForm()) {
      return;
    }

    const value = this.recipeForm.value;
    const recipe: Recipe = (
      value.name,
      value.information,
      value.ingredients
    );

    value.ingredients.map(ingredient => {
      recipe.ingredients.push(
        ingredient.ingredientName,
        ingredient.ingredientAmount,
        ingredient.ingredientUnits,
        ingredient.ingredientIsOwned);
    });

    if (recipe.id) {
      //this.recipeService.updateRecipe(recipe);
      this.wasSaved = true;
      this.saveRecipe();
    } else {
      //this.recipeService.createRecipe(recipe);
      this.wasSaved = true;
      this.saveRecipe();
    }

  }

  private setFormGroup(recipe?: Recipe) {
    if (!recipe) {
      return;
    }

    this.recipeForm.reset(recipe);
    this.recipe = recipe;
  }

  private checkFocus(i: number) {
    this.lastInputSelected = i === this.recipe.ingredients.length-1;
  }

  private saveRecipe() {
    this.modal.dismiss(this.recipe);
  }

  // private showErrorToast(message: string): void {
  //   window['Materialize'].toast(message, 4000, 'errorToast');
  // }

  private verifyForm(): boolean {
    let isValid = this.recipeForm.valid;

    if ((this.recipeForm.get('ingredients') as FormArray).length <= 0) {
      //this.showErrorToast('You must add ingredients');
      isValid = false;
    }

    if (!this.recipeForm.valid) {
      this.markFormGroupTouched(this.recipeForm);
      //this.showErrorToast('Make sure there are no empty fields');
      isValid = false;
    }

    return isValid;
  }

/**
* Marks all controls in a form group as touched
* @param formGroup - The group to caress..hah
*/
     private markFormGroupTouched(formGroup: FormGroup) {
      (Object as any).values(formGroup.controls).forEach(control => {
        control.markAsTouched();

        if (control.controls) {
          control.controls.forEach(c => this.markFormGroupTouched(c));
        }
      });
     }

}
