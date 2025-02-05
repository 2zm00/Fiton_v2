export type Role = 'member' | 'instructor' | 'centerowner';

export interface UserData {
	id: number;
	username: string;
	name: string;
	profile_image: string | null;
	role: 'member' | 'instructor' | 'centerowner' | 'none';
	gender: 'Male' | 'Female' | 'None';
	birth: string;
	phone_number: string;
}

export interface InstructorRoleData {
  specialties: string[];       
  certifications: string[];
  years_of_experience: number;    
  bio: string;
  rating: number;
}

export interface MemberRoleData {
  bio: string;
}

export interface CenterOwnerRoleData {
  business_registration_number: string;
}

export type RoleData = InstructorRoleData | MemberRoleData | CenterOwnerRoleData;

export interface UserInfoResponse {
  user_data: UserData;
  role_data: RoleData;
  role: Role;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

