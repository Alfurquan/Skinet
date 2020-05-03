import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginationComponent, PaginationHeaderComponent],
  imports: [CommonModule],
  exports: [PaginationComponent, PaginationHeaderComponent, FormsModule],
})
export class SharedModule {}
