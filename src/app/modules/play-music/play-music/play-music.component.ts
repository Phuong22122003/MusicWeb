import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-music',
  standalone: false,
  templateUrl: './play-music.component.html',
  styleUrl: './play-music.component.scss',
})
export class PlayMusicComponent implements OnInit {
  userId!: string;
  urlLink!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId')!;
      this.urlLink = params.get('urlLink')!;
      console.log(this.userId, this.urlLink);
    });
  }
}
