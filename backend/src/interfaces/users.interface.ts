export interface User {
  name: string;
  username: string;
  userId?: string;
  isAdmin?: boolean;
  apiKey?: string;
}

export interface UserSettings {
  id: number;
  userId: string;
  apiKey?: string;
}

export interface UserData {
  name: string;
  username: string;
  isAdmin?: boolean;
  apiKey?: string;
}
