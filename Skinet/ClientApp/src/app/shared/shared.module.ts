import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

@NgModule({
  declarations: [
    PaginationComponent,
    PaginationHeaderComponent,
    OrderTotalsComponent,
  ],
  imports: [CommonModule, CarouselModule.forRoot()],
  exports: [
    PaginationComponent,
    PaginationHeaderComponent,
    FormsModule,
    CarouselModule,
    OrderTotalsComponent,
  ],
})
export class SharedModule {}
