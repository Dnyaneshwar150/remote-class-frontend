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
  department: string;
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

export interface ClassPayload {
  name: string;
  year: string;
  division: string;
}

export interface TeacherResourcesResponse {
  data: TeacherResource[];
}

export interface TeacherResource {
  _id: string;
  title: string;
  year: string;
  subject: string;
  fileUrl: string;
  fileType: string;
  teacherId: string;
  createdAt: string;
  __v: number;
}

export interface CreateStudentPayload {
  firstname: string;
  lastname: string;
  rollNumber: string;
  dob: string;
  year: string; // change from year to class if your backend expects 'class'
  division: string;
}

export interface CreatedStudent {
  _id: string;
  firstname: string;
  lastname: string;
  rollNumber: string;
  dob: string;
  class: string;
  division: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateStudentResponse {
  success: boolean;
  message: string;
  data: CreatedStudent;
}

export interface AddResourcePayload {
  title: string;
  year: string;
  file: File;
}

export interface UploadAssignmentPayload {
  file: File;
  title: string;
  description: string;
  deadline: string; // or Date if backend accepts ISO
  year: string;
  division: string;
}

export interface ClassData {
  _id: string;
  name: string;
  year: string;
  division: string;
  assignedTeacher: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ClassesListResponse {
  success: boolean;
  data: ClassData[];
}

export interface CreateClassPayload {
  name: string;
  year: string;
  division: string;
}
