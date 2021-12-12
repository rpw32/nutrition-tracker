import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './recipe/modal.page';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { RecipeService } from '../services/recipe/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  _subscription: Subscription;
  recipes: Recipe[];

  constructor(public modalController: ModalController, private http: HttpClient, private recipeService: RecipeService) {}

  ngOnInit()
  {
    this._subscription = this.recipeService.recipesChange.subscribe((value) => {
      this.recipes = value;
    });
  }

  async presentModal(recipe: Recipe) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal-class',
      componentProps: {
        recipe
      },
      swipeToClose: true
    });

  modal.onWillDismiss().then((recipeData?) => {
    if (recipeData)
    {
      const returnedRecipe: Recipe = recipeData.data as Recipe;
      if (returnedRecipe)
      {
        this.updateRecipes(returnedRecipe);
      }
    }
  });

    return await modal.present();
  }

  updateRecipes(recipeUpdate: Recipe) {
    const updateItem = this.recipes.find(this.findIndexToUpdate, recipeUpdate._id);
    const index = this.recipes.indexOf(updateItem);

    if (index !== -1)
    {
      this.recipes[index] = recipeUpdate;
    }

    console.log(this.recipes);
  }

  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }
}
