import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PinturaEditorOptions } from '@pqina/pintura';
import { openEditor } from '../../../../shared/utils/image-edit';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-track',
  standalone: false,
  templateUrl: './upload-track.component.html',
  styleUrl: './upload-track.component.scss',
})
export class UploadTrackComponent implements OnInit {
  @Input('trackFile') trackFile!: File;
  Validators = Validators;
  genres = [
    { id: '1', name: 'Pop' },
    { id: '2', name: 'Rock' },
    { id: '3', name: 'Hip-Hop' },
    { id: '4', name: 'Jazz' },
  ];
  tags = [
    { id: 1, name: 'Tag 1' },
    { id: 2, name: 'Tag 2' },
    { id: 3, name: 'Tag 3' },
    { id: 4, name: 'Tag 4' },
  ];

  ngOnInit(): void {}

  constructor() {}
}
