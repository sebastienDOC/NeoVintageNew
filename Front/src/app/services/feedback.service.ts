import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Feedback } from '../models/feedback.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly API_URL = `${environment.apiUrl}/photos` || process.env['API_URL_PHOTOS'] || '';
  private feedbacksSubject = new BehaviorSubject<Feedback[]>([]);
  feedbacks$ = this.feedbacksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAllFeedbacks();
  }

  // Charger tous les avis
  loadAllFeedbacks(): void {
    this.http.get<Feedback[]>(this.API_URL).pipe(
      map(feedbacks => feedbacks.map(feedback => ({
        ...feedback,
        date: new Date(feedback.date) // Conversion de la date
      })))
    ).subscribe(
      feedbacks => this.feedbacksSubject.next(feedbacks),
      error => console.error('Erreur lors du chargement des avis:', error)
    );
  }

  // Ajouter un nouvel avis
  addFeedback(feedback: Omit<Feedback, 'id'>): Observable<Feedback> {
    return this.http.post<Feedback>(this.API_URL, feedback).pipe(
      tap(newFeedback => {
        const currentFeedbacks = this.feedbacksSubject.value;
        this.feedbacksSubject.next([newFeedback, ...currentFeedbacks]);
      })
    );
  }

  // Obtenir les statistiques des avis
  getFeedbackStats(): Observable<{
    averageRating: number;
    totalCount: number;
    ratingDistribution: { [key: number]: number }
  }> {
    return this.feedbacks$.pipe(
      map(feedbacks => {
        const totalCount = feedbacks.length;
        const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
        const distribution = feedbacks.reduce((acc, curr) => {
          acc[curr.rating] = (acc[curr.rating] || 0) + 1;
          return acc;
        }, {} as { [key: number]: number });

        return {
          averageRating: totalCount ? sum / totalCount : 0,
          totalCount,
          ratingDistribution: distribution
        };
      })
    );
  }

  // Supprimer un avis (si nécessaire)
  deleteFeedback(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        const currentFeedbacks = this.feedbacksSubject.value;
        this.feedbacksSubject.next(
          currentFeedbacks.filter(feedback => feedback.id !== id)
        );
      })
    );
  }
}
