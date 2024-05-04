export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prompt {
  _id: string;
  title: string;
  description: string;
  prompt: string;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
  platforms: string[];
  upvotes: number;
  downvotes: number;
  tags: string[];
}
