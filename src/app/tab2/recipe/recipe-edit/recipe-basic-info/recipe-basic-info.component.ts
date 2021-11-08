import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from '../../../../shared/models/recipe.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-basic-info',
  templateUrl: './recipe-basic-info.component.html',
  styleUrls: ['./recipe-basic-info.component.css']
})
export class RecipeBasicInfoComponent implements OnInit, OnChanges {
  @Input() recipeFormGroup: FormGroup;
  @Input() recipe: Recipe;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.recipe) {
      return;
    }

    this.recipeFormGroup.patchValue({
      name: this.recipe.name,
      information: this.recipe.information,
      ingredients: this.recipe.ingredients
    });
  }

}
