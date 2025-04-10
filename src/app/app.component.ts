import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'MusicWeb';
  isShowAuthModal = false;
  onShowAuthModal() {
    this.isShowAuthModal = true;
  }
  onCloseModal() {
    this.isShowAuthModal = false;
  }
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isOpenAuthModal.subscribe((isOpenAuth) => {
      this.isShowAuthModal = isOpenAuth;
    });
  }
}
