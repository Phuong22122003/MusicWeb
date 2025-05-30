import {
  Component,
  ElementRef,
  input,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { TrackCreation } from '../../../../core/models/TrackCreation';
import { formatDuration } from '../../../../shared/utils/track';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlbumService } from '../../../../core/services/album.service';
import { ApiResponse } from '../../../../core/models/api_response';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth-service';
import { GenreResponse } from '../../../../core/models/genre/genre_response.model';
import { TagResponse } from '../../../../core/models/tag/tag_response.model';
import { TagService } from '../../../../core/services/tag_service';
import { GenreService } from '../../../../core/services/genre_service';

@Component({
  selector: 'app-upload-album',
  standalone: false,
  templateUrl: './upload-album.component.html',
  styleUrl: './upload-album.component.scss',
})
export class UploadAlbumComponent implements OnInit, OnDestroy {
  Validators = Validators;
  @Input('trackFiles') trackFiles!: File[];
  @ViewChild('uploadedTracksSection') uploadedTracksSection!: ElementRef;
  @ViewChild('audio') audio!: ElementRef;

  selectedImageFile!: File;
  isOpenEditPanel = false;
  formatDuration = formatDuration;
  trackCreations: TrackCreation[] = [];
  currentIndex: number | null = null;
  infoTrackList: {
    duration: number;
    fileName: string;
    srcAudio: string;
    isPlay: boolean;
  }[] = [];
  selectedIndexToEdit: number = -1;
  metaData: any;
  editedImageUrl: string = '';
  userId: string = '';
  genres: GenreResponse[] = [];
  tags: TagResponse[] = [];
  albumTypes = ['EP', 'ALBUM'];
  isScroll = false;
  ngOnInit(): void {
    this.getTrackDetails();
    const authUser = this.authService.getUserId();
    if (!authUser) return;
    this.userId = authUser;
    this.tagService.getAllTags().subscribe((res) => {
      this.tags = res.data;
    });
    this.genreService.getAllGenres().subscribe((res) => {
      this.genres = res.data;
    });
  }

  constructor(
    private albumService: AlbumService,
    private authService: AuthService,
    private toastr: ToastrService,
    private tagService: TagService,
    private genreService: GenreService
  ) {}

  getTrackDetails() {
    this.trackFiles.forEach((file) => {
      this.extractInfoFromTrackFile(file);
    });
  }
  onSubmitMetadata(metaData: any) {
    this.metaData = metaData;

    this.isScroll = true;
  }
  onSubmit() {
    let isInvalid = this.trackCreations.some(
      (trackCreation) => trackCreation.title.length <= 0
    );
    if (isInvalid) return;
    console.log(
      this.metaData,
      this.trackCreations,
      this.trackFiles,
      this.selectedImageFile
    );
    const formData = new FormData();
    // 1. Meta data (AlbumRequest)

    formData.append(
      'meta-data',
      new Blob([JSON.stringify(this.metaData)], { type: 'application/json' })
    );

    // 2. Cover album image
    if (this.selectedImageFile) {
      formData.append('cover-album', this.selectedImageFile);
    }

    // 3. Track requests
    formData.append(
      'track-request',
      new Blob([JSON.stringify(this.trackCreations)], {
        type: 'application/json',
      })
    );

    // 4. Track files (MP3,...)
    this.trackFiles.forEach((file) => {
      formData.append('track-files', file);
    });

    // 5. Gửi request
    this.albumService.uploadAlbum(formData).subscribe({
      next: (res: ApiResponse<any>) => {
        this.showSuccess('Upload thành công');
        console.log(res);
      },
      error: (err: ApiResponse<any>) => {
        this.showFail('Upload thất bại:' + err.message);
        console.log(err);
      },
    });
  }
  scrollToSection() {
    this.uploadedTracksSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
    this.isScroll = false;
  }
  ngAfterViewChecked() {
    if (this.metaData && this.uploadedTracksSection && this.isScroll) {
      this.scrollToSection();
    }
  }
  onDeleteTrack(index: number) {
    URL.revokeObjectURL(this.infoTrackList[index].srcAudio);
    this.trackCreations.splice(index, 1);
    this.infoTrackList.splice(index, 1);
    this.trackFiles.splice(index, 1);
  }
  onEditTrack(index: number) {
    this.selectedIndexToEdit = index;
  }
  onSubmitEdit(metaData: TrackCreation) {
    if (this.selectedIndexToEdit < 0) return;

    this.trackCreations[this.selectedIndexToEdit] = metaData;
    this.trackCreations[this.selectedIndexToEdit].privacy = 'public';
    this.selectedIndexToEdit = -1;
  }
  onEditImage(image: File) {
    this.selectedImageFile = image;
  }
  ngOnDestroy() {
    this.infoTrackList.forEach((track) => URL.revokeObjectURL(track.srcAudio));
  }
  playAudio(index: number) {
    const audio = this.audio.nativeElement;
    const track = this.infoTrackList[index];

    // Nếu đang phát và nhấn vào cùng bài -> Pause
    if (this.currentIndex === index && !audio.paused) {
      audio.pause();
      this.infoTrackList[index].isPlay = false;
      this.currentIndex = null;
      return;
    }

    // Nếu có bài đang phát khác -> Dừng nó
    if (this.currentIndex !== null) {
      this.infoTrackList[this.currentIndex].isPlay = false;
    }

    // Phát bài mới
    audio.src = track.srcAudio;
    audio.play();
    this.currentIndex = index;
    this.infoTrackList[index].isPlay = true;

    // Khi phát xong, reset trạng thái
    audio.onended = () => {
      this.infoTrackList[index].isPlay = false;
      this.currentIndex = null;
    };
  }
  onSelectedNewTracks(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile.files && inputFile.files.length > 0) {
      for (const file of inputFile.files) {
        this.extractInfoFromTrackFile(file);
        this.trackFiles.push(file);
      }
    }
  }
  extractInfoFromTrackFile(trackFile: File) {
    const audio = new Audio();
    const objectURL = URL.createObjectURL(trackFile);

    audio.src = objectURL;
    audio.addEventListener('loadedmetadata', () => {
      this.infoTrackList.push({
        duration: audio.duration,
        fileName: trackFile.name,
        srcAudio: audio.src,
        isPlay: false,
      });
      this.pushTrackToList({
        title: trackFile.name.substring(0, trackFile.name.lastIndexOf('.')),
        userId: this.userId,
        privacy: 'public',
        mainArtists: 'user1',
        genreId: '',
        tagIds: [],
      });
    });
  }
  pushTrackToList(track: TrackCreation) {
    track = {
      ...track,
      tempId: Math.random().toString(36).substr(2, 9),
    } as TrackCreation;
    this.trackCreations.push(track);
  }
  closeEditTrack() {
    this.selectedIndexToEdit = -1;
  }
  drop(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.trackCreations,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(this.trackFiles, event.previousIndex, event.currentIndex);
    moveItemInArray(
      this.infoTrackList,
      event.previousIndex,
      event.currentIndex
    );
  }
  trackByTempId(index: number, item: any): number {
    return item.tempId;
  }

  showSuccess(msg: string) {
    this.toastr.success(msg, 'Success');
  }

  showFail(msg: string) {
    this.toastr.error(msg, 'Fail');
  }
}
