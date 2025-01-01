import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { EditContentComponent } from '../edit-content/edit-content.component';

@Component({
 selector: 'app-creators-gallery',
 standalone: true,
 imports: [CommonModule, EditContentComponent],
 templateUrl: './creators-gallery.component.html',
 styleUrls: ['./creators-gallery.component.scss']
})
export class CreatorsGalleryComponent implements OnInit {
 creators: any[] = [];
 private readonly API_URL = `${environment.apiUrl}/creators`;

 constructor(private http: HttpClient) {}

 ngOnInit(): void {
   this.loadCreators();
 }

 loadCreators(): void {
   this.http.get<any[]>(this.API_URL).subscribe({
     next: (data) => this.creators = data,
     error: (error) => alert('Erreur : ' + (error.error?.error || 'Erreur inconnue'))
   });
 }
}
