import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ModalController } from '@ionic/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeIngredientsListComponent } from './recipe-edit/recipe-ingredients-list/recipe-ingredients-list.component';

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

    const idField = this.recipeForm.get('id') as FormControl;
    idField.setValue(this.recipe.id ? this.recipe.id : 10);

    const nameField = this.recipeForm.get('name') as FormControl;
    nameField.setValue(this.recipe.name);

    const informationField = this.recipeForm.get('information') as FormControl;
    informationField.setValue(this.recipe.information ? this.recipe.information : 'Test');
  }

  onSubmit() {

    if (!this.verifyForm()) {
      return;
    }

    const recipe = new Recipe(this.recipeForm.value);
    console.log(`Submitted Recipe:`);
    console.log(recipe);
    console.log(this.recipe);

    if (recipe.id) {
      //this.recipeService.updateRecipe(recipe);
      this.wasSaved = true;
      this.setFormGroup(recipe);
      this.saveRecipe();
    } else {
      //this.recipeService.createRecipe(recipe);
      this.wasSaved = true;
      this.setFormGroup(recipe);
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

  private verifyForm(): boolean {
    let isValid = this.recipeForm.valid;

    if ((this.recipeForm.get('ingredients') as FormArray).length <= 0) {
      console.log('You must add ingredients');
      isValid = false;
    }

    if (!this.recipeForm.valid) {
      this.markFormGroupTouched(this.recipeForm);
      console.log('Make sure there are no empty fields');
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
