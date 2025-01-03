import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feedback } from '../../models/feedback.model';
import { FeedbackService } from '../../services/feedback.service';
import { finalize } from 'rxjs';

interface Review {
  id: number;
  authorInitials: string;
  rating: number;
  productName: string;
  comment: string;
  date: Date;
  verified: boolean;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ReviewsComponent implements OnInit {
  reviews: Feedback[] = [];
  reviewForm: FormGroup;
  showForm = false;
  isSubmitting = false;
  submitSuccess = false;
  currentStartIndex = 0;
  maxDisplayed = 5;
  averageRating = 0;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', Validators.required],
      authorInitials: ['', Validators.required],
      productName: ['', Validators.required],
      comment: ['', Validators.required],
      consent: [false, Validators.requiredTrue]
    });
  }

  get visibleReviews(): Feedback[] {
    return this.reviews.slice(
      this.currentStartIndex,
      this.currentStartIndex + this.maxDisplayed
    );
  }

  ngOnInit() {
    this.feedbackService.feedbacks$.subscribe(feedbacks => {
      this.reviews = feedbacks;
      this.updateVisibleReviews();
    });

    this.feedbackService.getFeedbackStats().subscribe(stats => {
      this.averageRating = stats.averageRating;
    });
  }

  next() {
    if (this.currentStartIndex + this.maxDisplayed < this.reviews.length) {
      this.currentStartIndex++;
    }
  }

  previous() {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex--;
    }
  }

  selectRating(rating: number) {
    this.reviewForm.patchValue({ rating });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      this.isSubmitting = true;

      const newFeedback: Omit<Feedback, 'id'> = {
        ...this.reviewForm.value,
        date: new Date(),
        verified: true
      };

      this.feedbackService.addFeedback(newFeedback)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe(
          () => {
            this.submitSuccess = true;
            this.reviewForm.reset();
            setTimeout(() => {
              this.submitSuccess = false;
              this.showForm = false;
            }, 3000);
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'avis:', error);
          }
        );
    }
  }

  private updateVisibleReviews() {
    // Mettre à jour les avis visibles dans le carousel
  }
}
