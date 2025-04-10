import { Component } from '@angular/core';

@Component({
  selector: 'app-albums',
  standalone: false,
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
})
export class AlbumsComponent {
  options = ['All', 'Created', 'Liked'];
  selectedOption: string = 'All';
}
