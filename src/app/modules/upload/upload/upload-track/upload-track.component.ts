import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PinturaEditorOptions } from '@pqina/pintura';
import { openEditor } from '../../../../shared/utils/image-edit';
import { Validators } from '@angular/forms';
import { TrackService } from '../../../../core/services/track.service';
import { Track } from '../../../../core/models/track';
import { MusicService } from '../../../../core/services/music.service';
import { TrackRequest } from '../../../../core/models/track/track_request.model';
import { AuthService } from '../../../../core/services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { TagService } from '../../../../core/services/tag_service';
import { GenreService } from '../../../../core/services/genre_service';
import { TagResponse } from '../../../../core/models/tag/tag_response.model';
import { GenreResponse } from '../../../../core/models/genre/genre_response.model';

@Component({
  selector: 'app-upload-track',
  standalone: false,
  templateUrl: './upload-track.component.html',
  styleUrl: './upload-track.component.scss',
})
export class UploadTrackComponent implements OnInit {
  @Input('trackFile') trackFile!: File;
  Validators = Validators;
  selectedImageFile!: File;
  metaData: any;
  genres: GenreResponse[] = [];
  tags: TagResponse[] = [];
  loggedUserId: string = '';
  ngOnInit(): void {
    this.loggedUserId = this.authService.getUserId() || '';
    this.tagService.getAllTags().subscribe((res) => {
      this.tags = res.data;
    });
    this.genreService.getAllGenres().subscribe((res) => {
      this.genres = res.data;
    });
  }

  constructor(
    private musicService: MusicService,
    private authService: AuthService,
    private toast: ToastrService,
    private tagService: TagService,
    private genreService: GenreService
  ) {}
  onEditImage(image: File) {
    this.selectedImageFile = image;
  }
  onSubmitMetadata(metaData: any) {
    this.metaData = metaData;
    console.log(metaData);
    this.uploadTrack();
  }

  uploadTrack() {
    if (!this.loggedUserId) return;
    const trackRequest: TrackRequest = {
      countPlay: 0,
      privacy: this.metaData.privacy,
      title: this.metaData.title,
      genreId: this.metaData.genre || '',
      tagIds: this.metaData.tags || [],
      description: this.metaData.description,
      userId: this.loggedUserId,
    };
    this.musicService
      .uploadTrack(this.selectedImageFile, this.trackFile, trackRequest)
      .subscribe({
        next: (res) => {
          this.toast.success('Add track successfully');
        },
        error: (err) => {
          this.toast.error(err);
        },
      });
  }
}
