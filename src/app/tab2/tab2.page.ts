import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './recipe/modal.page';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  recipes: Recipe[];

  constructor(public modalController: ModalController, private http: HttpClient) {
    this.http.get('assets/test-json/recipe.json').subscribe(data => {
      this.recipes = data['recipes'];
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

    modal.onWillDismiss().then((data) => {
      const returnedRecipe: Recipe = data['data'] as Recipe;
      console.log(returnedRecipe);
    });

    return await modal.present();
  }
}
