import { Component } from '@angular/core';

@Component({
  selector: 'app-visitor-home',
  standalone: false,
  templateUrl: './visitor-home.component.html',
  styleUrl: './visitor-home.component.scss',
})
export class VisitorHomeComponent {
  isShowAuthModal = false;
  onShowAuthModal() {
    this.isShowAuthModal = true;
  }
  onCloseModal() {
    console.log('alo');
    this.isShowAuthModal = false;
  }
}
