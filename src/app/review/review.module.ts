import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReviewCardComponent } from './components/latest-review-card/review-card.component';
import { StarRating } from './components/star-rating/star-rating.component';
import { ShopReviewComponent } from './components/reviews/shop-review.component';
import { ProductReviewComponent } from './components/reviews/product-review.component';

import { ReviewService } from './review.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    NgbModule
  ],
  declarations: [
    ReviewCardComponent,
    StarRating,
    ShopReviewComponent,
    ProductReviewComponent
  ],
  providers: [
    ReviewService
  ],
  exports: [
    ReviewCardComponent,
    StarRating,
    ShopReviewComponent,
    ProductReviewComponent
  ]
})
export class ReviewModule { }
