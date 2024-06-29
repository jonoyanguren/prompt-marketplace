export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  linkedin: string;
  twitter: string;
  web: string;
  creator: boolean;
  verified: boolean;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

export interface Platform {
  _id: string;
  code: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  votes: number;
  userHasUpvoted?: boolean;
}

export interface Prompt {
  _id: string;
  title: string;
  description: string;
  whoIsFor: string;
  howToUse: string;
  categories: Category[];
  prompt: string;
  createdBy: User;
  updatedAt: string;
  platforms: Platform[];
  price: number;
  servicePrice: number;
  upvotes: number;
  downvotes: number;
  tags: string[];
  userHasUpvoted?: boolean;
  userHasPaid?: boolean;
  createdAt: Date;
  salesCount?: number;
}

export interface Order {
  _id: string;
  userId: User;
  promptId: Prompt;
  price: number;
  amount: number;
  createdAt: Date;
}
