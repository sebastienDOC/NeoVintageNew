import { Component } from '@angular/core';
import { CardsServicesComponent } from "../cards-services/cards-services.component";

@Component({
  selector: 'app-services',
  imports: [CardsServicesComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      image: 'assets/images/friperie.png',
      title: 'Friperie en ligne',
      description: 'Découvrez une sélection de vêtements vintage.',
      link: '/friperie'
    },
    {
      image: 'assets/images/creators.png',
      title: 'Créateurs',
      description: 'Découvrez des créations uniques et artisanales.',
      link: '/createurs'
    },
    {
      image: 'assets/images/cart.png',
      title: 'Panier personnalisé',
      description: 'Composez votre propre sélection.',
      link: '/panier'
    }
  ];
}
