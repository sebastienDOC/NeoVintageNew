export interface Feedback {
  id?: string;
  authorInitials: string;
  rating: number;
  productName: string;
  comment: string;
  date: Date;
  verified: boolean;
}
