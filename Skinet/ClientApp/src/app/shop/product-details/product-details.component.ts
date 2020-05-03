import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  productId: number;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = +params.get('id');
    });
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(this.productId).subscribe(
      (response: IProduct) => {
        this.product = response;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
