import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() recipe: Recipe;

  public recipeForm: FormGroup;

  constructor(private modal: ModalController, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      information: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([])
    });

    this.setFormGroup(this.recipe);
  }

  onSubmit() {

    if (!this.verifyForm()) {
      return;
    }

    if (this.recipeForm.dirty) {
      let recipe = new Recipe(this.recipeForm.value);
      recipe._id = this.recipe._id;
      this.recipe = recipe;

      console.log(recipe);
      
      if (recipe._id) {
        let response = this.recipeService.updateRecipe(recipe).subscribe()
        console.log(response);
      } else {
        let response = this.recipeService.addRecipe(recipe).subscribe();
        console.log(response);
      }
    }

    this.saveRecipe(this.recipeForm.dirty);
  }

  private setFormGroup(recipe?: Recipe) {
    if (!recipe) {
      return;
    }

    const nameField = this.recipeForm.get('name') as FormControl;
    nameField.setValue(this.recipe.name);

    const informationField = this.recipeForm.get('information') as FormControl;
    informationField.setValue(this.recipe.information ? this.recipe.information : 'Test');

  }

  private saveRecipe(recipeChanged: Boolean) {
    this.modal.dismiss(recipeChanged ? this.recipe : null);
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
