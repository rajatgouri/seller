import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'ngx-sortablejs';
import { OrderRoutingModule } from './order.routing';

import { ViewComponent } from './components/view/view.component';
import { ListingComponent } from './components/listing/listing.component';
import { LastOrderCardComponent } from './components/last-order-card/last-order-card.component';

import { OrderService } from './services/order.service';

import { NoImagePipe, NoPhotoPipe } from '../shared/pipes';
import { ModalRefundComponent } from './components/modal-refund/modal-refund.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    //our custom module
    OrderRoutingModule,
    NgbModule
  ],
  declarations: [
    ViewComponent,
    ListingComponent,
    LastOrderCardComponent,
    NoImagePipe,
    NoPhotoPipe,
    ModalRefundComponent
  ],
  providers: [
    OrderService
  ],
  exports: [
    LastOrderCardComponent
  ]
})
export class OrderModule { }
