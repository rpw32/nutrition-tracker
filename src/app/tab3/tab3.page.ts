import { Component } from '@angular/core';
import { GroceriesService } from '../services/groceries.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  groceryList: any[];

  constructor(groceries: GroceriesService) {
    this.groceryList = groceries.groceryList;
  }

  removeItem(i)
  {
    console.log(`Removing item! ${i}`);
    this.groceryList.splice(i, 1);
  }

}
