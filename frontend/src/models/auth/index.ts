export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  fullname: string;
  password_confirmation: string;
}
