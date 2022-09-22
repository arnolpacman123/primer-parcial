import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule,
    PublicRoutingModule,
    AngularMaterialModule,
  ],
})
export class PublicModule {}
