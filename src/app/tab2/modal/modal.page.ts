import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() recipeName: string;
  @Input() recipeIngredients: Ingredient[];

  constructor() { }

  ngOnInit() {
    console.log(this.recipeIngredients);
  }

}
