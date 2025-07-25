export interface AuthResponse {
  status: string;
  message: string;
  data: {
    refreshToken: string;
    accessToken: string;
  };
}
