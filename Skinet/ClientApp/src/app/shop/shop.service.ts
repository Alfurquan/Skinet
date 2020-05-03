import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPagination } from '../shared/models/pagination';
import { IKeyValuePair } from '../shared/models/keyValueFilter';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/ShopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }

    if (shopParams.searchTerm) {
      params = params.append('search', shopParams.searchTerm);
    }

    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http
      .get<IPagination>('/api/products/', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getBrands(): Observable<IKeyValuePair[]> {
    return this.http.get<IKeyValuePair[]>('/api/products/brands');
  }

  getTypes(): Observable<IKeyValuePair[]> {
    return this.http.get<IKeyValuePair[]>('/api/products/types');
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/products/${id}`);
  }
}
