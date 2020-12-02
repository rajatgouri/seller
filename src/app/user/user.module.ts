import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user.routing';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComplainComponent } from './profile-complain/profile-complain.component';
import { UserService } from './user.service';
import { ProfileUpdateComponent } from './profile/profile-update.component';
import { MediaModule } from '../media/media.module';
import { UtilsModule } from '../utils/utils.module';
import { PhoneverifyModule } from '../shared/phoneverify/phoneverify.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //our custom module
    UserRoutingModule,
    NgbModule,
    MediaModule,
    UtilsModule,
    NgxIntlTelInputModule,
    PhoneverifyModule
  ],
  declarations: [
    ProfileUpdateComponent,
    ProfileCardComponent,
    ProfileComplainComponent
  ],
  providers: [UserService],
  exports: [
    ProfileCardComponent
  ],
  entryComponents: [ProfileComplainComponent]
})
export class UserModule { }
