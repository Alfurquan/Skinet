import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IKeyValuePair } from 'src/app/shared/models/keyValueFilter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input() items: IKeyValuePair[];
  @Input() itemSelected: number;
  @Output() itemClicked: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  onItemSelected(id) {
    this.itemClicked.emit(id);
  }
}
