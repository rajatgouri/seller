import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import { StatCardComponent } from '../stats/stats-card.component';

import { MediaModule } from '../media/media.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { ShopModule } from '../shop/shop.module';
import { ReviewModule } from '../review/review.module';

import { MessageService } from '../message/services/message.service';
import { StatService } from '../shared/services';

const routes: Routes = [{
  path: '',
  data: {
    title: 'Dashboard',
    urls: [{ title: 'Dashboard', url: '/starter' }, { title: 'Seller Dashboard' }]
  },
  component: StarterComponent
}];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MediaModule,
    OrderModule,
    ProductModule,
    ShopModule,
    ReviewModule
  ],
  declarations: [
    StarterComponent,
    StatCardComponent
  ],
  exports: [

  ],
  providers: [
    MessageService,
    StatService
  ]
})
export class StarterModule { }
