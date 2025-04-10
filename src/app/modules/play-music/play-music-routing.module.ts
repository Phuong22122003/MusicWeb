import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayMusicComponent } from './play-music/play-music.component';

const routes: Routes = [{ path: '', component: PlayMusicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayMusicRoutingModule {}
