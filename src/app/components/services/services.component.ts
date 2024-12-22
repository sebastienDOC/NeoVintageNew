import { Component } from '@angular/core';
import { CardsBannerComponent } from '../cards-banner/cards-banner.component';

@Component({
  selector: 'app-services',
  imports: [CardsBannerComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  cards = [
    {
      icon: 'fa-solid fa-leaf',
      title: 'Mode Responsable',
      description:
        'Nos vêtements et accessoires de seconde main sont sélectionnés avec soin pour réduire l\'impact environnemental et sensibiliser à la fast fashion.'
    },
    {
      icon: 'fa-solid fa-recycle',
      title: 'Économie Circulaire',
      description:
        'Donnez une nouvelle vie à des vêtements et accessoires uniques. Ensemble, promouvons une économie durable qui encourage le réemploi et valorise le partage.'
    },
    {
      icon: 'fa-solid fa-heart',
      title: 'Confiance et Solidarité',
      description:
        'Neo Vintage est plus qu\'une boutique. C\'est un espace chaleureux, où chacun peut s\'exprimer, échanger et retrouver confiance en soi grâce à la mode.'
    }
  ];
}
