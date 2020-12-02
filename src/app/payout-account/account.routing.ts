import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountCreateComponent } from './components/form/create.component';
import { AccountUpdateComponent } from './components/form/update.component';
import { AccountsComponent } from './components/listing/listing.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    data: {
      title: 'Account manager',
      urls: [{ title: 'Accounts', url: '/payout/account' }]
    }
  },
  {
    path: 'create',
    component: AccountCreateComponent,
    data: {
      title: 'Account manager',
      urls: [{ title: 'Accounts', url: '/payout/account' }, { title: 'Create', url: '/payout/account/create' }]
    }
  },
  {
    path: 'update/:id',
    component: AccountUpdateComponent,
    data: {
      title: 'Account manager',
      urls: [{ title: 'Accounts', url: '/payout/account' }, { title: 'Update', url: '/payout/account/update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
