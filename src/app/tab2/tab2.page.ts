import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './recipe/modal.page';
import { Recipe } from '../shared/models/recipe.model';
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

  constructor(public modalController: ModalController, private recipeService: RecipeService) {}

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

    return await modal.present();
  }
}
