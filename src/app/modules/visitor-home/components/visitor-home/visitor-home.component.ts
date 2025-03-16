import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visitor-home',
  standalone: false,
  templateUrl: './visitor-home.component.html',
  styleUrl: './visitor-home.component.scss',
})
export class VisitorHomeComponent implements OnInit, OnDestroy, AfterViewInit {
  isShowAuthModal = false;
  sliderQuantity: number = 3;
  sliderCount: number = -1;

  intervalSub: any;
  @ViewChild('slider') slider: ElementRef | undefined;
  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {}
  onShowAuthModal() {
    this.isShowAuthModal = true;
  }
  onCloseModal() {
    console.log('alo');
    this.isShowAuthModal = false;
  }
  ngAfterViewInit(): void {
    this.intervalSub = setInterval(() => {
      if (this.sliderCount < this.sliderQuantity - 1) {
        this.sliderCount += 1;
        this.renderer.setStyle(
          this.slider?.nativeElement,
          'transform',
          `translate(${-25 * this.sliderCount}%)`
        );
      } else {
        this.sliderCount = 0;
        this.renderer.setStyle(
          this.slider?.nativeElement,
          'transform',
          `translate(${-25 * this.sliderCount}%)`
        );
      }
    }, 3000);
  }
  onClickSliderIndex(index: number) {
    this.sliderCount = index;
    this.renderer.setStyle(
      this.slider?.nativeElement,
      'transform',
      `translate(${-25 * this.sliderCount}%)`
    );
  }
  ngOnDestroy(): void {
    if (!this.intervalSub) return;
    clearInterval(this.intervalSub);
  }
}
