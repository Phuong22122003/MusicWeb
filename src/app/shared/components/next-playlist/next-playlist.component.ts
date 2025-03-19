import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NextPlayListService } from '../../../core/services/next-play-list.service';
import { Track } from '../../../core/models/track';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-next-playlist',
  standalone: false,
  templateUrl: './next-playlist.component.html',
  styleUrl: './next-playlist.component.scss',
})
export class NextPlaylistComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef;
  @ViewChild('processBar', { static: true }) processBar!: ElementRef;
  addTrackSubs!: Subscription;
  addTrackListSubs!: Subscription;
  playPauseTrackSubs!: Subscription;
  deleteByIndexSubs!: Subscription;
  deleteAllSubs!: Subscription;
  currentTime: number = 0;
  progress: number = 0;
  duration: number = 0;
  isPlay: boolean = false;
  isOpenNextUpList = false;
  audioUrl: string = '';
  username: string = '';
  trackName: string = '';
  currentIndex: number = 0;
  tracks: Track[] = [];
  originalTracks: any[] = [];
  repeatModes = ['off', 'one', 'all'];
  repeatModeIndex = 0;
  isShuffle: boolean = false;
  currentVolume: number = 50;
  isFirstTime: boolean = true;
  get repeatMode() {
    return this.repeatModes[this.repeatModeIndex];
  }
  constructor(
    private renderer: Renderer2,
    private nextPlayListService: NextPlayListService
  ) {}
  ngOnInit(): void {
    this.currentVolume = 50;

    this.addTrackSubs = this.nextPlayListService.addTrackSubject.subscribe(
      (track: Track) => {
        if (track && track.id !== '0') {
          this.tracks.push(track);
        }
      }
    );
    this.addTrackListSubs =
      this.nextPlayListService.addTrackListSubject.subscribe(
        (tracks: Track[]) => {
          if (tracks && tracks.length > 0) {
            this.tracks = tracks;
            this.username = this.tracks[0].username;
            this.audioUrl = this.tracks[0].file_path;
            this.trackName = this.tracks[0].name;
          }
        }
      );
    this.playPauseTrackSubs =
      this.nextPlayListService.playPauseTrackInNextPLayListSubject.subscribe(
        (res) => {
          let audioPlayerEl = this.audioPlayer.nativeElement;
          console.log(this.currentIndex, res.index);
          let selectedTrack = this.tracks[res.index];
          console.log(selectedTrack);
          if (!selectedTrack) return;
          if (res.type === 'PLAY') {
            if (this.currentIndex !== res.index) {
              this.audioUrl = selectedTrack.file_path;
              this.username = selectedTrack.username;
              this.trackName = selectedTrack.name;
              audioPlayerEl.load();
            }
            audioPlayerEl.play();
            this.isPlay = true;
          } else {
            audioPlayerEl.pause();
            this.isPlay = false;
          }
          this.currentIndex = res.index;
          this.isFirstTime = false;
        }
      );
    this.nextPlayListService.addTrackListSubject.next([
      {
        id: '1',
        name: 'My Song123123',
        title: 'Awesome Track',
        description: 'A great song to listen to',
        file_path: 'assets/audios/NhuNgayHomQua.mp3',
        cover_image_path: '/assets/image.png',
        user_id: '123',
        duration: '03:45',
        create_at: '2024-03-17T12:00:00Z',
        username: 'john_doe',
      },
      {
        id: '2',
        name: 'My Song 2',
        title: 'Awesome Track 2',
        description: 'A great song to listen to 2',
        file_path: 'assets/audios/NoiNayCoAnh.mp3',
        cover_image_path: '/assets/image.png',
        user_id: '123',
        duration: '03:30',
        create_at: '2024-03-17T12:00:00Z',
        username: 'john_doe',
      },
      {
        id: '3',
        name: 'My Song 3',
        title: 'Awesome Track 2',
        description: 'A great song to listen to 2',
        file_path: 'assets/audios/NoiNayCoAnh.mp3',
        cover_image_path: '/assets/image.png',
        user_id: '123',
        duration: '03:30',
        create_at: '2024-03-17T12:00:00Z',
        username: 'john_doe',
      },
      {
        id: '4',
        name: 'My Song 4',
        title: 'Awesome Track 2',
        description: 'A great song to listen to 2',
        file_path: 'assets/audios/NoiNayCoAnh.mp3',
        cover_image_path: '/assets/image.png',
        user_id: '123',
        duration: '03:30',
        create_at: '2024-03-17T12:00:00Z',
        username: 'john_doe',
      },
    ]);
    this.deleteByIndexSubs =
      this.nextPlayListService.deleteTrackByIndex.subscribe((trackIndex) => {
        this.tracks.splice(trackIndex, 1);
        console.log(trackIndex);
      });
    this.deleteAllSubs = this.nextPlayListService.deleteAll.subscribe(() => {
      let currentTrack = this.tracks[this.currentIndex];
      this.tracks = [];
      this.tracks.push(currentTrack);
    });
  }
  ngAfterViewInit(): void {}
  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = audio.currentTime;
    this.progress = (audio.currentTime / audio.duration) * 100;

    this.renderer.setStyle(
      this.processBar.nativeElement,
      'width',
      `${Math.round(this.progress)}%`
    );
  }
  setDuration() {
    console.log(this.audioPlayer.nativeElement.duration);
    this.duration = this.audioPlayer.nativeElement.duration;
  }
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  }
  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlay = true;
      this.emitStatusTrack(this.currentIndex, 'PLAY');
    } else {
      audio.pause();
      this.emitStatusTrack(this.currentIndex, 'STOP');
      this.isPlay = false;
    }
  }
  seekAudio(event: any) {
    const audio = this.audioPlayer.nativeElement;

    audio.currentTime = (event.target.value / 100) * audio.duration;
  }
  changeVolume(event: any) {
    const audio = this.audioPlayer.nativeElement;
    this.currentVolume = event.target.value;
    audio.volume = this.currentVolume / 100;
  }
  toggleNextUpList() {
    this.isOpenNextUpList = !this.isOpenNextUpList;
  }
  onCloseNextUpList() {
    this.isOpenNextUpList = false;
  }
  toggleRepeat() {
    this.repeatModeIndex = (this.repeatModeIndex + 1) % this.repeatModes.length;
  }

  onPlayTrack(index: number) {
    let track: Track = this.tracks[index];
    if (!track) return;
    const audio = this.audioPlayer.nativeElement;
    this.audioUrl = track.file_path;
    this.username = track.username;
    this.trackName = track.name;
    audio.load();
    audio.play();
    this.isPlay = true;
    this.currentIndex = index;
    this.emitStatusTrack(this.currentIndex, 'PLAY');
  }
  onAudioEnded() {
    this.isPlay = false;
    if (
      this.repeatMode === 'off' &&
      this.currentIndex < this.tracks.length - 1
    ) {
      this.onPlayTrack(++this.currentIndex);
    }
    if (this.repeatMode === 'one') {
      this.onPlayTrack(this.currentIndex);
    }
    if (this.repeatMode === 'all') {
      this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
      this.onPlayTrack(this.currentIndex);
    }
  }
  toggleShuffle() {
    this.isShuffle = !this.isShuffle;
    if (this.isShuffle) {
      this.originalTracks = [...this.tracks];
      this.tracks = this.shuffleArray([...this.tracks], this.currentIndex);
    } else {
      this.tracks = [...this.originalTracks];
    }
  }
  shuffleArray(array: any[], currentIndex: number): any[] {
    if (array.length <= 1) return array; // Nếu danh sách quá nhỏ, không cần shuffle

    // Lấy bài hát hiện tại ra khỏi danh sách
    const currentTrack = array[currentIndex];
    const remainingTracks = array.filter((_, index) => index !== currentIndex);

    // Shuffle các bài còn lại bằng thuật toán Fisher-Yates
    for (let i = remainingTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingTracks[i], remainingTracks[j]] = [
        remainingTracks[j],
        remainingTracks[i],
      ];
    }

    // Chèn lại bài hát hiện tại vào vị trí cũ
    remainingTracks.splice(currentIndex, 0, currentTrack);
    return remainingTracks;
  }

  onNextTrack() {
    this.currentIndex = (this.currentIndex + 1) % this.tracks.length;
    this.onPlayTrack(this.currentIndex);
  }
  onPrevTrack() {
    this.currentIndex =
      this.currentIndex - 1 < 0
        ? this.tracks.length - 1
        : this.currentIndex - 1;
    this.onPlayTrack(this.currentIndex);
  }
  emitStatusTrack(index: number, type: string) {
    this.isFirstTime = false;
    this.nextPlayListService.playPauseTrackInNextPLayListSubject.next({
      index: index,
      type: type,
    });
  }
  ngOnDestroy(): void {
    if (this.playPauseTrackSubs) {
      this.playPauseTrackSubs.unsubscribe();
    }
    if (this.addTrackListSubs) {
      this.addTrackListSubs.unsubscribe();
    }
    if (this.addTrackSubs) {
      this.addTrackSubs.unsubscribe();
    }
    if (this.deleteByIndexSubs) {
      this.deleteByIndexSubs.unsubscribe();
    }
    if (this.deleteAllSubs) {
      this.deleteAllSubs.unsubscribe();
    }
  }
  toggleMute() {
    this.currentVolume = this.currentVolume > 0 ? 0 : 50;
    const audio = this.audioPlayer.nativeElement;
    audio.volume = this.currentVolume / 100;
  }
  handleDropDrag(event: any) {
    this.tracks = event.tracks;
    this.currentIndex = event.currentIndex;
    console.log(this.tracks);
  }
}
