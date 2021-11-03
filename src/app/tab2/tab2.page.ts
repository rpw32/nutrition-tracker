import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { Recipe } from '../shared/models/recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  recipeMap: Map<string, Ingredient[]>;
  recipes: Recipe[];

  constructor(public modalController: ModalController, private http: HttpClient) {
    this.http.get('assets/test-json/recipe.json').subscribe(data => {
      data['recipes'].forEach(item => {
        console.log(this.recipeMap);
       });
    });
  }

  async presentModal(name: string, ingredients: Ingredient[]) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal-class',
      componentProps: {
        recipeName: name,
        recipeIngredients: ingredients
      },
      swipeToClose: true
    });

    modal.onWillDismiss().then((data) => {
      const recipe = data['data'];
      console.log(recipe);
    });

    return await modal.present();
  }
}
