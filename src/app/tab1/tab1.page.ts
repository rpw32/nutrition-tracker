import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../services/recipe/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  _subscription: Subscription;
  recipes: Recipe[];
  information: any[];
  startEnd = this.getFirstDayOfWeek();

  automaticClose = false;

  constructor(private http: HttpClient, private recipeService: RecipeService) {
    this.http.get('assets/test-json/information.json').subscribe(data => {
      this.information = data['items'];
    });
  }

  ngOnInit()
  {
    this._subscription = this.recipeService.recipesChange.subscribe((value) => {
      this.recipes = value;
    });
    console.log(this.recipes);
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;

    if (this.automaticClose && this.information[i].open)
    {
      this.information
        .filter((item, itemIndex) => itemIndex !== i)
        .map(item => item.open = false);
    }
  }

  getFirstDayOfWeek()
  {
    const startDate = new Date();
    let diff = startDate.getDate() - startDate.getDay();;
    startDate.setDate(diff);

    const endDate = new Date();
    diff = startDate.getDate() + 6;
    endDate.setDate(diff);

    return [startDate, endDate];
  }

}

