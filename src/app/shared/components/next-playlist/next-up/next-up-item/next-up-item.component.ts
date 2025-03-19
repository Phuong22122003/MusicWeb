import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Track } from '../../../../../core/models/track';
import { NextPlayListService } from '../../../../../core/services/next-play-list.service';

@Component({
  selector: 'app-next-up-item',
  standalone: false,
  templateUrl: './next-up-item.component.html',
  styleUrl: './next-up-item.component.scss',
})
export class NextUpItemComponent implements OnInit {
  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input('track') track!: Track;
  @Input('trackIndex') trackIndex!: number;
  @Input('isPlaying') isPlaying: boolean = false;
  @Output() deleteEvent = new EventEmitter<number>();
  constructor(
    private nextPlayListService: NextPlayListService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.nextPlayListService.playPauseTrackInNextPLayListSubject.subscribe(
      (res) => {
        console.log(res);
        if (this.trackIndex !== res.index) return;
        if (res.type === 'PLAY') {
          this.isPlaying = true;
        } else {
          this.isPlaying = false;
        }
      }
    );
  }
  onPlay() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.nextPlayListService.playPauseTrackInNextPLayListSubject.next({
        index: this.trackIndex,
        type: 'PLAY',
      });
    } else {
      this.isPlaying = false;
      this.nextPlayListService.playPauseTrackInNextPLayListSubject.next({
        index: this.trackIndex,
        type: 'STOP',
      });
    }
  }
  onDelete(event: any) {
    event.stopPropagation();

    // this.renderer.addClass(this.container.nativeElement, 'translate-x-full');
    // this.renderer.addClass(this.container.nativeElement, 'opacity-0');
    // setTimeout(() => {
    //   this.nextPlayListService.deleteTrackByIndex.next(this.trackIndex);
    // }, 300);
    this.deleteEvent.emit(this.trackIndex);
  }
}
