import { Request as ExpressRequest } from "express";

export interface ExtendedRequest extends ExpressRequest {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}
