import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ProductComponent ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ ProductComponent ]
})
export class SharedComponentsModule { }
