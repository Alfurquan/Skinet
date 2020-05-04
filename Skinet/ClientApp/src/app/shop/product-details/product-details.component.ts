import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  productId: number;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id');
    });
    this.loadProduct();
  }

  addItemToBasket(item: IBasketItem) {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  loadProduct() {
    this.shopService.getProduct(this.productId).subscribe(
      (response: IProduct) => {
        this.product = response;
        this.bcService.set('@productDetails', this.product.name);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
