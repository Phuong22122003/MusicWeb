import { AfterViewInit, Component, ElementRef, Input, Output, EventEmitter ,ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js'
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'

@Component({
  selector: 'app-wavesurfer',
  standalone: false,
  templateUrl: './wavesurfer.component.html',
  styleUrl: './wavesurfer.component.scss'
})
export class WavesurferComponent implements AfterViewInit {
  @Input({required:true}) trackUrl="./assets/audio/music.mp3";
  @Input() height:number=100;
  @Input() isMuted = false;
  @Output() playStateChanged = new EventEmitter<boolean>();
  @ViewChild('waveform', { static: true }) waveformRef!: ElementRef;
  @ViewChild('totalTime', { static: false }) totalTimeRef!: ElementRef;
  private wavesurfer!: WaveSurfer;
  constructor(){
    // alert('a')
  }

  

  ngAfterViewInit(): void {
    this.wavesurfer = WaveSurfer.create({
      container: this.waveformRef?.nativeElement,
      waveColor: 'rgb(197, 197, 197)',
      progressColor: '#f8400d',
      cursorColor: '#f8400d',
      url: this.trackUrl,
      barWidth:2,
      barHeight:1,
      height:this.height,

      plugins: [
        Hover.create({
          lineColor: '#ff0000',
          lineWidth: 2,
          labelBackground: '#555',
          labelColor: '#fff',
          labelSize: '11px',
        }),
      ],
    });
    this.events();
  }

  play(){
    this.wavesurfer.play();
  }
  pause(){
    this.wavesurfer.pause();
  }
  changeUrl(url:string){
    this.wavesurfer.load(url);
    this.wavesurfer.on('ready', () => {
      this.totalTimeRef.nativeElement.innerText = this.formatTime(this.wavesurfer?.getDuration());
      this.wavesurfer.play();
      this.playStateChanged.emit(true);
    });
  }
  events(){
    this.wavesurfer?.on('interaction',()=>{
      this.wavesurfer?.play();
      this.playStateChanged.emit(true);
    });
    this.wavesurfer?.on('finish',()=>{
      this.playStateChanged.emit(false);
    })
    this.wavesurfer.on('ready', () => {
      this.totalTimeRef.nativeElement.innerText = this.formatTime(this.wavesurfer?.getDuration());
    });

    this.wavesurfer.setMuted(this.isMuted);
  }
  formatTime(seconds: number): string {
    console.log(seconds);
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    // console.log(`${minutes}:${secs < 10 ? '0' : ''}${secs}`)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
