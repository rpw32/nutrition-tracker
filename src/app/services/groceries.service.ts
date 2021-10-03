import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  groceryList: any[] = [];
  constructor() { }

  addToList(str: any) {
    this.groceryList.push(str);
  }
}
