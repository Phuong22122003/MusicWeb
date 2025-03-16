import { Component } from '@angular/core';

@Component({
  selector: 'app-header-logout',
  standalone: false,
  templateUrl: './header-logout.component.html',
  styleUrl: './header-logout.component.scss'
})
export class HeaderLogoutComponent {
  isShowAuthModal = false;
  onShowAuthModal() {
    this.isShowAuthModal = true;
  }
  onCloseModal() {
    console.log('alo');
    this.isShowAuthModal = false;
  }
}
