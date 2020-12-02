import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentUpgradeComponent } from './components/payment-upgrade/upgrade.component';
import { PaymentHistoryComponent } from './components/payment-history/history.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  
  {
    path: 'history',
    component: PaymentHistoryComponent,
    data: {
      title: 'Payments History',
      urls: [{ title: 'Payment', url: '/payments/history' }, { title: 'Payments History' }]
    }
  },
  {
    path: 'upgrade',
    component: PaymentUpgradeComponent,
    data: {
      title: 'Upgrade Featured Account',
      urls: [{ title: 'Payment', url: '/payments/history' }, { title: 'Upgrade Featured Account' }]
    }
  },
  {
    path: 'success',
    component: PaymentSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
