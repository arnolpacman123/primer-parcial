import { RoleI } from "./role.interface";

export interface UserI {
  id?: number;
  email?: string;
  password?: string;
  role?: RoleI;
}