import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthLayoutComponent } from './layouts/auth/auth.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { ConfigResolver } from './shared/resolver';

export const Approutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    ]
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    resolve: { appConfig: ConfigResolver },
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
      { path: 'users', loadChildren: './user/user.module#UserModule' },
      { path: 'products', loadChildren: './product/product.module#ProductModule' },
      { path: 'refunds', loadChildren: './refund/refund.module#RefundModule' },
      { path: 'shops', loadChildren: './shop/shop.module#ShopModule' },
      { path: 'orders', loadChildren: './order/order.module#OrderModule' },
      { path: 'coupons', loadChildren: './coupon/coupon.module#CouponModule' },
      { path: 'payments', loadChildren: './payment/payment.module#PaymentModule' },
      { path: 'requestPayout', loadChildren: './request-payout/request-payout.module#RequestPayoutModule' },
      { path: 'payout/account', loadChildren: './payout-account/account.module#AccountModule' },
      { path: 'messages', loadChildren: './message/message.module#MessageModule' }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
