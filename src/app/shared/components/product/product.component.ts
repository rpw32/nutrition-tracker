import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GroceriesService } from '../../../services/grocery/groceries.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  constructor(private toastCtrl: ToastController, public groceries: GroceriesService) { }

  ngOnInit() {}

  async addIngredient(ingredient) {
    const toast = await this.toastCtrl.create({
      message: `Added to grocery list: ${ingredient.name}`,
      duration: 2000,
      position: 'top'
    });
    toast.present();

    this.groceries.addToList(ingredient.name);
  }
}
