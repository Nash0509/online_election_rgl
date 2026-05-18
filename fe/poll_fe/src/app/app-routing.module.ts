import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AudienceComponent } from './audience/audience.component';
const routes: Routes = [
  {
    path: '',
    component: AudienceComponent,
  },
  {
    path: 'dashboard',
    component: AdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
