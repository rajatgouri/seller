import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../review.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import * as _ from 'lodash';

@Component({
  selector: 'review-card',
  templateUrl: './review-card.html'
})
export class ReviewCardComponent implements OnInit {

  @Input() shopId: string = "";
  public reviews = [];
  public searchField: any = {
    page: 1,
    take: 5,
    type: 'shop'
  };

  constructor(private router: Router, private reviewService: ReviewService, private toasty: ToastyService) {

  }

  ngOnInit() {
    let params = Object.assign({
      shopId: this.shopId
    }, this.searchField);
    this.reviewService.find(params).then((res) => {
      this.reviews = res.data.items;
    })
      .catch(() => this.toasty.error('Something went wrong, please try again!'));
  }

}
