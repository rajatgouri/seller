import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/starter', title: 'Dashboard', icon: 'fa fa-dashboard', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/products/list', title: 'Products', icon: 'fa fa-database', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/products/list', title: 'Products', icon: 'fa fa-database', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/products/create', title: 'New product', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/orders/list', title: 'Orders', icon: 'fa fa-bars', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/orders/list', title: 'Orders', icon: 'fa fa-usd', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/refunds', title: 'Refunds', icon: 'fa fa-undo', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/coupons/list', title: 'Coupons', icon: 'fa fa-tags', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/coupons/list', title: 'Coupons', icon: 'fa fa-tags', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/coupons/create', title: 'New Coupon', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/messages/conversations', title: 'Messages', icon: 'fa fa-comments', class: '', label: '', labelClass: '', extralink: false, submenu: []
  },
  {
    path: '/payout/list', title: 'Payout', icon: 'fa fa-money', class: 'has-arrow', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/requestPayout', title: 'Requests Payout', icon: 'fa fa-tags', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/requestPayout/create', title: 'New Request', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/payout/account', title: 'Payout Account', icon: 'fa fa-user', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/payout/account/create', title: 'New Account', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
    ]
  },
  {
    path: '/payments/history', title: 'Payment', icon: 'fa fa-product-hunt', class: '', label: '', labelClass: '', extralink: false, submenu: [
      { path: '/payments/history', title: 'Payment History', icon: 'fa fa-product-hunt', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
      { path: '/payments/upgrade', title: 'Upgrade Featured Account', icon: 'fa fa-plus', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    ]
  }
];
