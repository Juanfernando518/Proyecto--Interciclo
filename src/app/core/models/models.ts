export type UserRole = 'admin' | 'programmer' | 'user';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  
  // ESTAS SON LAS PROPIEDADES QUE FALTAN Y CAUSAN TU ERROR:
  specialty?: string;   // <--- Esta es la culpable
  description?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

// Interfaces adicionales necesarias
export interface Project {
  id?: string;
  programmerId: string;
  title: string;
  description: string;
  type: 'academic' | 'laboral';
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
}

export interface Advisory {
  id?: string;
  programmerId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  topic: string;
  dateRequest: string;
  status: 'pending' | 'accepted' | 'rejected';
  adminComment?: string;
}