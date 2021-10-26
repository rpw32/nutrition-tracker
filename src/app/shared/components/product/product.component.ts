import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroceriesService } from 'src/app/services/groceries.service';
import { ApiService } from 'src/app/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  constructor(private toastCtrl: ToastController, public groceries: GroceriesService, public api: ApiService) { }

  ngOnInit() {}

  // addRecipe(): Observable<any> {
  //   const params = {name: 'Chicken Tikka Masala', price: '12.23'};

  //   const paramString = JSON.stringify(params);
  //   const paramObj = JSON.parse(paramString);

  //   console.log('Entered the addRecipe function');


  //   // set headers
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   };

  //   console.log('returning api');
  //   // submit form to backend to get name by email
  //   return this.api.addRecipe(paramObj, httpOptions).pipe(
  //     map(
  //       data => {
  //         if  ((data !== -1) && (data != null)){
  //           console.log('Success');// successfully found a name in the db for this email
  //           return data;
  //         }
  //         else {
  //           // couldn't find a name
  //           console.log('Failure');
  //           return false;
  //         }
  //       },
  //     )
  //   );
  // }

  async addIngredient(ingredient) {
    const toast = await this.toastCtrl.create({
      message: `Added to grocery list: ${ingredient.name}`,
      duration: 2000,
      position: 'top'
    });
    toast.present();

    this.groceries.addToList(ingredient.name);

    // this.addRecipe().subscribe();
  }
}
