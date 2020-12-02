import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './component/listing.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent,
    data: {
      title: 'Refund management',
      urls: [{ title: 'Orders', url: '/orders/list' }, { title: 'Refund' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefundRoutingModule { }
