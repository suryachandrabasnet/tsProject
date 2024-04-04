import { User } from "../models";

declare module 'express' {
    interface Request {
      user?: User;
    }
  }

interface UserInterface {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: string;
    role?: string;
}

export default UserInterface;