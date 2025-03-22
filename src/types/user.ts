export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin: boolean;
}

export interface UserProfile extends User {
  address?: string;
  phone?: string;
  birthdate?: string;
} 