import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';

@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductFilterComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule, HttpClientModule, SharedModule, ShopRoutingModule],
  exports: [],
})
export class ShopModule {}
