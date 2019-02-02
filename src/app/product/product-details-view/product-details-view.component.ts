import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../add-product/product.model';
import { ProductService } from './../../product/product.service';


@Component({
  selector: 'app-product-details-view',
  templateUrl: './product-details-view.component.html',
  styleUrls: ['./product-details-view.component.css']
})
export class ProductDetailsViewComponent implements OnInit {
  @Input() productModel: Product;
  @Input() mainCatergoryName: string;
  constructor() { }

  ngOnInit() {
  }
}
