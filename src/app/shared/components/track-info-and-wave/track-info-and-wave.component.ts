import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { WavesurferComponent } from '../wavesurfer/wavesurfer.component';
import { Track } from '../../../core/models/track';

@Component({
  selector: 'app-track-info-and-wave',
  standalone: false,
  templateUrl: './track-info-and-wave.component.html',
  styleUrl: './track-info-and-wave.component.scss'
})
export class TrackInfoAndWaveComponent {
  isPlaying = false;
  isCommentVisible  = false;
  @Input() track!:Track;
  @Input() useForPlaylistAndAlbum:boolean=false;
  @Output() clickPlayButton = new EventEmitter<boolean>();
  @Output() comment = new EventEmitter<String>();
  @Output() like = new EventEmitter<boolean>();
  

  @ViewChild('waveform', { static: true }) waveformRef!: WavesurferComponent;
  
  changeUrl(url:string){
    this.waveformRef.changeUrl(url);
  }

  togglePlaying(){
    this.isCommentVisible  = true;
    if(this.isPlaying){
      this.pause();
    }
    else{
      this.play();
    }
    this.clickPlayButton.emit(this.isPlaying);
  }
  pause(){
    this.isPlaying = false;
    this.waveformRef.pause();
  }
  play(){
    this.isPlaying = true;
    this.waveformRef.play();
  }
  changeButtonIcon(isPlaying:boolean){
    this.isCommentVisible  = true;
    this.isPlaying = isPlaying;
    this.clickPlayButton.emit(this.isPlaying);
  }
}
