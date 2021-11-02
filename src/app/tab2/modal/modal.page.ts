import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() recipeName: string;
  @Input() recipeIngredients: Ingredient[];

  lastInputSelected = false;

  constructor(private modal: ModalController) { }

  ngOnInit() {
    console.log(this.recipeIngredients);
  }

  checkFocus(i: number) {
    this.lastInputSelected = i === this.recipeIngredients.length-1;
  }

  saveRecipe(name: string) {
    this.modal.dismiss(name);
  }

}
