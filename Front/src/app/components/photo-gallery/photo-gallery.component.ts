import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class PhotoGalleryComponent implements OnInit {
  photos: any[] = [];
  selectedPhoto: any;
  currentIndex = 0;
  editMode = false;
  password = '';

  private readonly API_URL = 'http://localhost:3000/photos';
  private readonly VALIDATE_PASSWORD_URL = 'http://localhost:3000/validate-password';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (data) => {
        this.photos = data;
        this.selectedPhoto = this.photos[0];
      },
      error: (error) => {
        alert('Erreur : ' + (error.error?.error || 'Erreur inconnue'));
      }
    });
  }

  selectPhoto(photo: any): void {
    this.selectedPhoto = photo;
    this.currentIndex = this.photos.indexOf(photo);
  }

  getThumbnails(): any[] {
    return this.photos.filter(photo => photo !== this.selectedPhoto);
  }

  moveCarousel(direction: 'prev' | 'next'): void {
    if (direction === 'prev') {
      this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    } else if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    }

    this.selectedPhoto = this.photos[this.currentIndex];
  }

  enableEditMode(): void {
    if (!this.password) {
      alert('Veuillez entrer le mot de passe pour activer le mode édition.');
      return;
    }

    this.http.post(this.VALIDATE_PASSWORD_URL, { password: this.password }).subscribe({
      next: () => {
        this.editMode = true;
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Mot de passe incorrect !');
        } else if (error.status === 400) {
          alert('Veuillez entrer un mot de passe');
        } else {
          alert('Erreur : ' + (error.error?.error || 'Erreur inconnue'));
        }
      }
    });
  }

  savePhotos(): void {
    if (!this.password) {
      alert('Veuillez entrer le mot de passe pour sauvegarder les modifications.');
      return;
    }

    const headers = { password: this.password };
    this.http.put(this.API_URL, this.photos, { headers }).subscribe({
      next: () => {
        alert('Photos mises à jour avec succès !');
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Mot de passe incorrect !');
        } else {
          alert('Erreur serveur : ' + (error.error?.error || 'Erreur inconnue'));
        }
      }
    });
  }
}
