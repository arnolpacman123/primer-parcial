export interface RegisterForm {
  email: string;
  password: string;
  role: number;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface Role {
  id: number;
  name: string;
}