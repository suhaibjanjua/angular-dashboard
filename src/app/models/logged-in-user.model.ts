export interface LoggedInUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  token?: string;
  permissions?: string[];
}
