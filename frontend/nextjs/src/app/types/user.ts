export type Role = 'member' | 'instructor' | 'centerowner';

export interface UserData {
	username: string;
	name: string;
	profile_image: string | null;
	role: 'member' | 'instructor' | 'centerowner' | 'none';
	gender: 'Male' | 'Female' | 'None';
	birth: string;
	phone_number: string;
  specialties: string[];       
  certifications: string[];
  years_of_experience: number;    
  bio: string;
  business_registration_number: string;
  rating: number;
}



export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

