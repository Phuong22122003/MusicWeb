import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../../../../core/services/profile.service';
import { UserProfile } from '../../../../core/models/user_profile';
import { openEditor } from '../../../../shared/utils/image-edit';
import { PinturaEditorOptions } from '@pqina/pintura';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../../../core/services/file.service';
import { AuthService } from '../../../../core/services/auth-service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-avatar-background',
  standalone: false,
  templateUrl: './avatar-background.component.html',
  styleUrl: './avatar-background.component.scss',
})
export class AvatarBackgroundComponent implements OnInit {
  @Input('userProfile') userProfile!: UserProfile;
  avatarUrl: string = environment.fileApi + '/image/avatar';
  avatarSelected!: File;
  coverSelected!: File;
  loginUserId!: string;
  editorOptions = {
    imageCropMinSize: { width: 400, height: 400 },
    cropEnableImageSelection: false,
    imageCropAspectRatio: 1,
  } as PinturaEditorOptions;

  editorCoverOptions = {
    imageCropAspectRatio: 3.5 / 1,
  } as PinturaEditorOptions;
  constructor(
    private profileService: ProfileService,
    private toast: ToastrService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loginUserId = this.authService.getUserId() as string;
  }
  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatarSelected = input.files[0];
      openEditor(
        this.avatarSelected,
        this.editorOptions,
        (editedFile, editedImageUrl) => {
          this.avatarSelected = editedFile;
          const avatar = new FormData();
          avatar.append('avatar', this.avatarSelected);
          this.profileService.uploadAvatar(avatar).subscribe({
            next: (res) => {
              this.userProfile.avatar = res.data.avatarName;
              console.log(this.userProfile.avatar);
              this.toast.success('Upload avatar successfully', 'Success');
            },
            error: (err) => {
              console.log(err);
              this.toast.error(err.message, 'Error');
            },
          });
        }
      );
    }
  }

  onCoverSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.coverSelected = input.files[0];
      openEditor(this.coverSelected, this.editorCoverOptions, (editedFile) => {
        this.coverSelected = editedFile;
        const cover = new FormData();
        cover.append('cover', this.coverSelected);
        this.profileService.uploadCover(cover).subscribe({
          next: (res) => {
            this.userProfile.cover = res.data.coverName;
            console.log(this.userProfile.cover);
            this.toast.success('Upload cover successfully', 'Success');
          },
          error: (err) => {
            console.log(err);
            this.toast.error(err.message, 'Error');
          },
        });
      });
    }
  }
}
