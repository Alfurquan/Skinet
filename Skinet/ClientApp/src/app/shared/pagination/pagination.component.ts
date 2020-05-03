import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number;
  @Input() pageSize = 10;
  @Output() pageChanged = new EventEmitter();
  pages: any[];
  currentPage = 1;

  ngOnChanges(): void {
    this.currentPage = 1;

    const pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      this.pages.push(i);
    }
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  previous() {
    if (this.currentPage === 1) {
      return;
    }

    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage === this.pages.length) {
      return;
    }

    this.currentPage++;
    this.pageChanged.emit(this.currentPage);
  }
}
