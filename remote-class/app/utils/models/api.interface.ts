export interface LoginPayload {
    email: string;
    password: string;
  }
  

  export interface ForgetPasswordPayload {
    ["email"]: string;
  }
  

  export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      _id: string;
      email: string;
      token: string;
    };
  }
  export interface ResetPasswordPayload {
    password: { password: string };
    authToken: string;
  }

  export interface SignupPayload {
    firstName: string;
    lastName: string;
    collegeCode: string;
    email: string;
    password: string;
    phoneNumber: string;
    department:string;
  }

  export interface SignupResponse {
    success: boolean;
    message: string;
    data: {
      _id: string;
      email: string;
      token: string;
    };
  }

  export interface StudentLoginPayload {
    email: string;
    password: string;
  }

  export interface StudentLoginResponse {
    success: boolean;
    message: string;
    data: {
      _id: string;
      email: string;
      token: string;
    };
  } 