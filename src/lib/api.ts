import axios from 'axios';
import {
  type User,
  type UserInput,
  type UserUpdateInput,
  type Product,
  type ProductInput,
  type ProductUpdateInput,
  LoginInput,
  type AuthResponse,
  type PaginatedResponse
} from './types';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const login = (username: string, password: string) =>
  api.post<AuthResponse>('/auth/login', { username, password });

export const register = (userData: UserInput) =>
  api.post<AuthResponse>('/auth/register', userData);

export const logout = () =>
  api.post<{ message: string }>('/auth/logout');

export const getProfile = () =>
  api.get<{ user: User }>('/auth/profile');

// Users API
export const getUsers = () =>
  api.get<{ users: User[] }>('/users');

export const getUser = (id: string) =>
  api.get<{ user: User }>(`/users/${id}`);

export const createUser = (userData: UserInput) =>
  api.post<{ message: string, user: User }>('/users', userData);

export const updateUser = (id: string, userData: UserUpdateInput) =>
  api.put<{ message: string, user: User }>(`/users/${id}`, userData);

export const deleteUser = (id: string) =>
  api.delete<{ message: string }>(`/users/${id}`);

// Products API
export const getProducts = (page = 1, limit = 10) =>
  api.get<{ products: Product[], pagination: PaginatedResponse<Product>['pagination'] }>(`/products?page=${page}&limit=${limit}`);

export const searchProducts = (searchTerm: string) =>
  api.get<{ products: Product[] }>(`/products/search?q=${searchTerm}`);

export const getProduct = (id: string) =>
  api.get<{ product: Product }>(`/products/${id}`);

export const createProduct = (productData: ProductInput) =>
  api.post<{ message: string, product: Product }>('/products', productData);

export const updateProduct = (id: string, productData: ProductUpdateInput) =>
  api.put<{ message: string, product: Product }>(`/products/${id}`, productData);

export const deleteProduct = (id: string) =>
  api.delete<{ message: string }>(`/products/${id}`);

export default api;
