import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'ngx-sortablejs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CouponRoutingModule } from './coupon.routing';

import { CouponCreateComponent } from './components/form/create.component';
import { CouponUpdateComponent } from './components/form/update.component';
import { CouponsComponent } from './components/listing/listing.component';

import { CouponService } from './services/coupon.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    //our custom module
    CouponRoutingModule,
    NgbModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [
    CouponCreateComponent,
    CouponUpdateComponent,
    CouponsComponent
  ],
  providers: [
    CouponService
  ]
})
export class CouponModule { }
