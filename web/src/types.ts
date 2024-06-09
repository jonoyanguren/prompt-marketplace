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
  categories: Category[];
  prompt: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  platforms: Platform[];
  upvotes: number;
  downvotes: number;
  tags: string[];
  userHasUpvoted?: boolean;
}
