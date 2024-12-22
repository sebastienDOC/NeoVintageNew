import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ServicesComponent } from "../../components/services/services.component";

@Component({
  selector: 'app-landing-page',
  imports: [HeaderComponent, ServicesComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
