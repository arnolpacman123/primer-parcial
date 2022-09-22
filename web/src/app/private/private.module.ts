import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PrivateRoutingModule,
  ]
})
export class PrivateModule { }
