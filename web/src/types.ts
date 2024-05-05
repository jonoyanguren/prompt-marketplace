export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
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
}

export interface Prompt {
  _id: string;
  title: string;
  description: string;
  categories: Category[];
  prompt: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  platforms: Platform[];
  upvotes: number;
  downvotes: number;
  tags: string[];
}
