import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ ProductComponent ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ ProductComponent ]
})
export class SharedComponentsModule { }
