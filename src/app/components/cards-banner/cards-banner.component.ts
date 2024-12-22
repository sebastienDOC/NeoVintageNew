import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-banner',
  imports: [],
  templateUrl: './cards-banner.component.html',
  styleUrl: './cards-banner.component.scss'
})
export class CardsBannerComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}
