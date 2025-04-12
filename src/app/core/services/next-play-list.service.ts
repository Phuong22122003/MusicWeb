import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class NextPlayListService {
  addTrackSubject: BehaviorSubject<Track> = new BehaviorSubject<Track>({
    id: '0',
    name: 'Undefined',
    title: 'Undefined',
    description: 'Undefined',
    fileName: '/assets/audios/music.mp3',
    coverImagePath: '/assets/image.png',
    userId: 'Undefined',
    duration: 'Undefined',
    createdAt: 'Undefined',
    username: 'Undefined',
  });
  addTrackListSubject: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>(
    []
  );
  deleteTrackByIndex: Subject<number> = new Subject<number>();
  deleteAll: Subject<void> = new Subject<void>();
  playPauseTrackInNextPLayListSubject: Subject<{
    index: number;
    type: string;
  }> = new Subject<{
    index: number;
    type: string;
  }>();

  constructor() {}
}
