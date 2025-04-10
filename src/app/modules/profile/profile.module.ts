import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AvatarBackgroundComponent } from './profile/avatar-background/avatar-background.component';
import { PanelTabComponent } from './profile/panel-tab/panel-tab.component';
import { RouterModule } from '@angular/router';
import { AllTabComponent } from './profile/panel-tab/all-tab/all-tab.component';
import { ListTabComponent } from './profile/panel-tab/list-tab/list-tab.component';
import { TrackTabComponent } from './profile/panel-tab/track-tab/track-tab.component';
import { SharedModule } from '../../shared/shared.module';
import { TrackInfoAndWaveComponent } from '../../shared/components/track-info-and-wave/track-info-and-wave.component';
import { StatBarComponent } from './profile/stat-bar/stat-bar.component';
import { ProfileEditingComponent } from './profile/profile-editing/profile-editing.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AvatarBackgroundComponent,
    PanelTabComponent,
    AllTabComponent,
    ListTabComponent,
    TrackTabComponent,
    StatBarComponent,
    ProfileEditingComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, RouterModule, SharedModule],
})
export class ProfileModule {}
