import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'ngx-sortablejs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProductRoutingModule } from './product.routing';
import { NgSelectModule } from '@ng-select/ng-select';

import { VariantUpdateModalComponent, ProductVariantsComponent } from './components/variants/product-variants.component';
import { ProductCreateComponent } from './components/products/create.component';
import { ProductUpdateComponent } from './components/products/update.component';
import { ProductsComponent } from './components/products/listing.component';

import { ProductCategoryService } from './services/category.service';
import { BrandService } from './services/brand.service';
import { OptionService } from './services/option.service';
import { ProductVariantService } from './services/variant.service';
import { ProductService } from './services/product.service';
import { LocationService } from '../shared/services';

import { MediaModule } from '../media/media.module';
import { ReviewModule } from '../review/review.module';
import { UserService } from '../user/user.service';
import { ShopService } from '../shop/shop.service';
import { PublishModalComponent } from './components/publishModal/publish-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    // our custom module
    ProductRoutingModule,
    NgbModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    MediaModule,
    ReviewModule,
    NgSelectModule
  ],
  declarations: [
    VariantUpdateModalComponent,
    PublishModalComponent,
    ProductVariantsComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductsComponent
  ],
  providers: [
    ProductCategoryService,
    BrandService,
    UserService,
    OptionService,
    ProductVariantService,
    ProductService,
    LocationService,
    ShopService
  ],
  entryComponents: [
    VariantUpdateModalComponent,
    PublishModalComponent
  ]
})
export class ProductModule { }
