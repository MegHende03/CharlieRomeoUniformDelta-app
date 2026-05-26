import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";


export type SignUpRequest = {
  fullname: string;
  email: string;
  password: string;
};

export type LogInRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  id: number;
  email: string;
  fullname: string;
  token: string;
};

//http://localhost:8080/api/auth/signup
export async function signUp(request: SignUpRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/signup`,
    request
  );

  return response.data;
}

//http://localhost:8080/api/auth/login
export async function logIn(request: LogInRequest): Promise<AuthResponse> {
  const response = await axios.post<AuthResponse>(
    `${API_BASE_URL}/auth/login`,
    request
  );

  return response.data;
}