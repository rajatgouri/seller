import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './components/products/create.component';
import { ProductUpdateComponent } from './components/products/update.component';
import { ProductsComponent } from './components/products/listing.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductsComponent,
    data: {
      title: 'Product manager',
      urls: [{ title: 'Products', url: '/products/list' }]
    }
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    data: {
      title: 'Product manager',
      urls: [{ title: 'Products', url: '/products/list' }, { title: 'Create', url: '/products/create' }]
    }
  },
  {
    path: 'update/:id',
    component: ProductUpdateComponent,
    data: {
      title: 'Product manager',
      urls: [{ title: 'Products', url: '/products/list' }, { title: 'Update', url: '/products/update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
