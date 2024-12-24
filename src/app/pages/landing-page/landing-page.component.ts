import { Component } from '@angular/core';
import { AboutComponent } from "../../components/about/about.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ServicesComponent } from "../../components/services/services.component";
import { PhotoGalleryComponent } from "../../components/photo-gallery/photo-gallery.component";

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, ServicesComponent, AboutComponent, PhotoGalleryComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
