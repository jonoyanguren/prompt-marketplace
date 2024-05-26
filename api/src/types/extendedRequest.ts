import { Request as ExpressRequest } from "express";

export interface ExtendedRequest extends ExpressRequest {
  file?: any;
  user?: {
    id: string;
    username: string;
    email: string;
  };
}
