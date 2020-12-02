import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponCreateComponent } from './components/form/create.component';
import { CouponUpdateComponent } from './components/form/update.component';
import { CouponsComponent } from './components/listing/listing.component';

const routes: Routes = [
  {
    path: 'list',
    component: CouponsComponent,
    data: {
      title: 'Coupon manager',
      urls: [{ title: 'Coupons', url: '/coupons/list' }]
    }
  },
  {
    path: 'create',
    component: CouponCreateComponent,
    data: {
      title: 'Coupon manager',
      urls: [{ title: 'Coupons', url: '/coupons/list' }, { title: 'Create', url: '/coupons/create' }]
    }
  },
  {
    path: 'update/:id',
    component: CouponUpdateComponent,
    data: {
      title: 'Coupon manager',
      urls: [{ title: 'Coupons', url: '/coupons/list' }, { title: 'Update', url: '/coupons/update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
