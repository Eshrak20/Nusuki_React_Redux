export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqProps {
  faqs: FaqItem[];
}
