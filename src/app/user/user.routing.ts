import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileUpdateComponent } from './profile/profile-update.component';

const routes: Routes = [
  {
    path: 'profile/update', component: ProfileUpdateComponent,
    data: {
      title: 'Profile update',
      urls: [{ title: 'Profile Update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
