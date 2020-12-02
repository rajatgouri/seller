import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefundRoutingModule } from './refund.routing';

import { ListingComponent} from './component/listing.component';

import { RefundService } from './refund.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    RefundRoutingModule,
    NgbModule
  ],
  declarations: [
    ListingComponent
  ],
  providers: [ RefundService ],
  exports: []
})
export class RefundModule { }
