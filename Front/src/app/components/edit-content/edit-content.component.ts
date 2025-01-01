import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditContentComponent implements OnInit {
  @Input() photos: any[] = [];
  @Input() creators: any[] = [];
  @Output() photosChange = new EventEmitter<any[]>();
  @Output() creatorsChange = new EventEmitter<any[]>();

  password = '';
  editMode = false;
  showPasswordModal = false;

  private readonly BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.http.get<any[]>(`${this.BASE_URL}/photos`).subscribe(
      photos => this.photos = photos
    );
    this.http.get<any[]>(`${this.BASE_URL}/creators`).subscribe(
      creators => this.creators = creators
    );
  }

  closeModals(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.showPasswordModal = false;
      this.editMode = false;
      this.password = '';
    }
  }

  enableEdit(): void {
    if (!this.password) {
      alert('Veuillez entrer le mot de passe');
      return;
    }

    this.http.post(`${this.BASE_URL}/validate-password`, { password: this.password }).subscribe({
      next: () => {
        this.editMode = true;
        this.showPasswordModal = false;
      },
      error: (error) => this.handleError(error)
    });
  }

  saveAll(): void {
    forkJoin({
      photos: this.http.put(`${this.BASE_URL}/photos`, this.photos, {
        headers: { password: this.password }
      }),
      creators: this.http.put(`${this.BASE_URL}/creators`, this.creators, {
        headers: { password: this.password }
      })
    }).subscribe({
      next: () => {
        this.photosChange.emit(this.photos);
        this.creatorsChange.emit(this.creators);
        alert('Contenu mis à jour avec succès !');
        this.editMode = false;
      },
      error: this.handleError.bind(this)
    });
  }

  private handleError(error: any): void {
    if (error.status === 403) alert('Mot de passe incorrect !');
    else alert('Erreur : ' + (error.error?.error || 'Erreur inconnue'));
  }
}
