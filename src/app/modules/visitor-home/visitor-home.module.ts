import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorHomeRoutingModule } from './visitor-home-routing.module';
import { VisitorHomeComponent } from './components/visitor-home/visitor-home.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [VisitorHomeComponent],
  imports: [CommonModule, VisitorHomeRoutingModule, SharedModule],
})
export class VisitorHomeModule {}
