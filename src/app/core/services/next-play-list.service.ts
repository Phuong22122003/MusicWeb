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
    file_path: '/assets/audios/music.mp3',
    cover_image_path: '/assets/image.png',
    user_id: 'Undefined',
    duration: 'Undefined',
    create_at: 'Undefined',
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
