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
  firstname: string;
  lastname: string;
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
  rollNumber: string;
  dob: string;
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
  year: string;
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
  subject: string;
  file: File;
}

export interface UploadAssignmentPayload {
  file: File;
  title: string;
  description: string;
  deadline: string;
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

export interface TeacherDashboardResponse {
  success: boolean;
  data: {
    teacherId: string;
    teacherName: string;
    classCount: number;
    assignmentCount: number;
    resourceCount: number;
  };
}

export interface TeacherAssignment {
  file: string;
  title: string;
  description: string;
  deadline: string;
  year: string;
  division: string;
}

export interface CreateClassResponse {
  success: boolean;
  message: string;
}
export interface TeacherAssignmentsResponse {
  success: boolean;
  data: Assignment[];
}

export interface Assignment {
  _id: string;
  assignmentId: string;
  title: string;
  description: string;
  fileUrl: string | null;
  fileType: string | null;
  year: string;
  division: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentAssignment {
  assignmentId: string;
  title: string;
}

export interface StudentDashboardData {
  studentName: string;
  rollNumber: string;
  year: string;
  division: string;
  totalAssignments: number;
  submittedAssignments: number;
  pendingAssignments: number;
  resourcesAvailable: number;
  classCount: number;
  submittedAssignmentsList: StudentAssignment[];
  pendingAssignmentsList: StudentAssignment[];
}

export interface StudentDashboardResponse {
  success: boolean;
  data?: StudentDashboardData;
  message?: string;
}

export type AcademicYear = "FY" | "SY" | "TY" | "BE";

interface StudentResource {
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

export interface StudentResourceResponse {
  success: boolean;
  message: string;
  data: StudentResource[];
}

export interface StudentInfo {
  _id: string;
  firstname: string;
  lastname: string;
  rollNumber: string;
  dob: string;
  year: string;
  division: string;
}

export interface TeacherInfo {
  _id: string;
  teacherId: string;
  firstname: string;
  lastname: string;
  collegeCode: string;
  email: string;
  phoneNumber: string;
  department: string;
  role: string;
}

//chat interface
export interface GroupCreatePayload {
  year: string;
  division: string;
  allowStudentToSend: boolean;
}

export interface GroupResponse {
  success: boolean;
  message: string;
  data: {
    groupId: number;
    groupName: string;
    year: string;
    division: string;
    allowStudentToSend: boolean;
    createdBy: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface TeacherGroup {
  _id: string;
  groupId: number;
  groupName: string;
  year: string;
  division: string;
  allowStudentToSend: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GroupMessage {
  _id: string;
  groupId: string;
  senderRole: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GroupMessageResponse {
  success: boolean;
  data: GroupMessage[];
}

export interface GroupInfoResponse {
  success: boolean;
  data: {
    _id: string;
    groupId: number;
    groupName: string;
    year: string;
    division: string;
    allowStudentToSend: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    groupId: string;
    senderRole: string;
    senderId: string;
    senderName: string;
    message: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface SendMessageRequest {
  groupId: number;
  message: string;
}

export interface StudentGroup {
  _id: string;
  groupId: number;
  groupName: string;
  year: string;
  division: string;
  allowStudentToSend: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentGroupsResponse {
  success: boolean;
  data: StudentGroup[];
}

export interface ClassItem {
  id: string;
  name: string;
  year: string;
  division: string;
  assignedTeacher: string;
}

export interface GetClassListStudentResponse {
  success: boolean;
  data: {
    count: number;
    classes: ClassItem[];
  };
}
