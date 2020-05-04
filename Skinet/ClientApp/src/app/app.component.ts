import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('Initialized basket');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
