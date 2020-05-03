import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IPagination } from '../shared/models/pagination';
import { IKeyValuePair } from '../shared/models/keyValueFilter';
import { ShopParams } from '../shared/models/ShopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IKeyValuePair[];
  types: IKeyValuePair[];
  totalCount: number;
  shopParams = new ShopParams();

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price low to high', value: 'priceAsc' },
    { name: 'Price high to low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
      (response: IPagination) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getBrands() {
    this.shopService.getBrands().subscribe(
      (response: IKeyValuePair[]) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getTypes() {
    this.shopService.getTypes().subscribe(
      (response: IKeyValuePair[]) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.shopParams.pageNumber = 1;
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.pageNumber = 1;
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(page) {
    if (this.shopParams.pageNumber !== page) {
      this.shopParams.pageNumber = page;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
