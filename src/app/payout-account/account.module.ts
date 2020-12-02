import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortablejsModule } from 'ngx-sortablejs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AccountRoutingModule } from './account.routing';
import { LocationService } from '../shared/services';

import { AccountCreateComponent } from './components/form/create.component';
import { AccountUpdateComponent } from './components/form/update.component';
import { AccountsComponent } from './components/listing/listing.component';

import { AccountService } from './services/account.service';
import { NgxStripeModule } from 'ngx-stripe';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SortablejsModule,
    //our custom module
    AccountRoutingModule,
    NgbModule,
    UtilsModule,
    
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgxStripeModule.forRoot()

  ],
  declarations: [
    AccountCreateComponent,
    AccountUpdateComponent,
    AccountsComponent
  ],
  providers: [
    AccountService,
    LocationService
  ]
})
export class AccountModule { }
