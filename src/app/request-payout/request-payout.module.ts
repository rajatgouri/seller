import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { ListingComponent } from './component/listing.component';
import { CreateRequestPayoutComponent } from './component/create.component';

import { RequestPayoutService } from './request-payout.service';

const routes: Routes = [{
  path: '',
  component: ListingComponent,
  data: {
    title: 'Request Payout manager',
    urls: [{ title: 'Requests Payout', url: '/requestPayout' }]
  }
}, {
  path: 'create',
  component: CreateRequestPayoutComponent,
  data: {
    title: 'New Request',
    urls: [{ title: 'Requests Payout', url: '/requestPayout' }, { title: 'New Request' }]
  }
}];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  declarations: [
    ListingComponent,
    CreateRequestPayoutComponent
  ],
  providers: [RequestPayoutService],
  exports: []
})
export class RequestPayoutModule { }
