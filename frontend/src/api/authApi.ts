import  axiosClient  from './axiosClient';


//Request and Response match backend request and reponses.

//what we are asking from the user
export type SignUpRequest = {
  fullname: string;
  email: string;
  password: string;
};

export type LogInRequest = {
  email: string;
  password: string;
};

//what we are recieving after valid request.
export type AuthResponse = {
  id: number;
  email: string;
  fullname: string;
  token: string;
};

//http://localhost:8080/api/auth/signup
//When API endpoint is hit, send SignUpRequest to backend. Wait to exectute anything else until response data is given.
export async function signUp(request: SignUpRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    "/auth/signup",
    request
  );

  return response.data;
}

//http://localhost:8080/api/auth/login
//When API endpoint is hit, send LogInRequest to backend. Wait to exectute anything else until response data is given.
export async function logIn(request: LogInRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>(
    "/auth/login",
    request
  );

  return response.data;
}