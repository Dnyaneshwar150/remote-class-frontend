export interface LoginPayload {
    email: string;
    password: string;
  }
  

  export interface ForgetPasswordPayload {
    ["email"]: string;
  }
  

  export interface LoginResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    uuid: string;
    
  }

  export interface ResetPasswordPayload {
    password: { password: string };
    authToken: string;
  }

  export interface SignupPayload {
    fullName: string;
    email: string;
    college: string;
    classes: string;
    collegeCode: string;
    password: string;
  }

  export interface SignupResponse {
    message: string;
    userId: string;
  }

  export interface StudentLoginPayload {
    email: string;
    password: string;
  }

  export interface StudentLoginResponse {
    token: string;  
     user: {
    id: string;
    name: string;
    email: string;
  };
  } 