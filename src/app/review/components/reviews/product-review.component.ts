import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'product-review',
  templateUrl: './review.html'
})
export class ProductReviewComponent implements OnInit {

  @Input() productId: string = "";
  public reviews = [];
  public page: number = 1;
  public take: number = 5;
  public total: any;

  constructor(private router: Router, private reviewService: ReviewService, private toasty: ToastyService) {

  }

  ngOnInit() {
    this.query();
  }

  query() {
    let params = {
      productId: this.productId,
      page: this.page,
      take: this.take,
      type: 'product'
    };
    this.reviewService.find(params).then((res) => {
      this.reviews = res.data.items;
      this.total = res.data.count;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }
}
