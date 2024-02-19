export interface Cards {
  cards: CardType[];
}

export interface CardType {
  id: string;
  nickname: string;
  twitter: string;
  hashtag?: string[];
  socialMedia?: {
    instagram?: string;
    github?: string;
    blog?: string;
  };
  customFields?: {
    key: string;
    contents: string;
    id: string;
  }[];
  password: string;
  updated_at: string;
  bio: string;
}
