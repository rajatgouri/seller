import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaymentRoutingModule } from './payment.routing';
import { NgxStripeModule } from 'ngx-stripe';

import { PaymentHistoryComponent } from './components/payment-history/history.component';
import { PaymentUpgradeComponent } from './components/payment-upgrade/upgrade.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

import { PackageService } from './services/package.service';
import { PaymentService } from './services/payment.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaymentRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot()
  ],
  declarations: [
    PaymentHistoryComponent,
    PaymentUpgradeComponent,
    PaymentComponent,
    PaymentSuccessComponent
  ],
  providers: [
    PackageService,
    PaymentService
  ],
  exports: [],
  entryComponents: [PaymentComponent]
})
export class PaymentModule { }
