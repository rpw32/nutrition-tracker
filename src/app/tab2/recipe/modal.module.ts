import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeImageComponent } from '../recipe/recipe-edit/recipe-image/recipe-image.component';
import { RecipeBasicInfoComponent } from '../recipe/recipe-edit/recipe-basic-info/recipe-basic-info.component';
import { RecipeDirectionsListComponent } from '../recipe/recipe-edit/recipe-directions-list/recipe-directions-list.component';
import { RecipeIngredientsListComponent } from '../recipe/recipe-edit/recipe-ingredients-list/recipe-ingredients-list.component';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalPageRoutingModule
  ],
  declarations: [ModalPage,
    RecipeImageComponent,
    RecipeIngredientsListComponent,
    RecipeBasicInfoComponent]
})
export class ModalPageModule {}
