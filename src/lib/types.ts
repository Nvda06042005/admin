// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'user';
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url?: string;
  category: string;
}

export interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
  category?: string;
}

// Auth Types
export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

// Pagination Types
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
