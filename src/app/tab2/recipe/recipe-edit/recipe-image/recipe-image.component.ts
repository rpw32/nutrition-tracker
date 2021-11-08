import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Recipe} from '../../../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-image',
  templateUrl: './recipe-image.component.html',
  styleUrls: ['./recipe-image.component.css']
})
export class RecipeImageComponent implements OnInit, OnChanges {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  public imagePath = `http://lorempixel.com/300/200/food/${Math.round(Math.random() * 10)}`;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.recipe) {
      return;
    }
  }

}
