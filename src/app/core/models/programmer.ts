export interface Programmer {
  id?: string;                // Firestore document ID
  name: string;               // nombre completo
  specialty: string;          // especialidad
  description: string;        // breve descripción
  photoUrl: string;           // foto de perfil

  email: string;              // correo del usuario (Firebase Auth)
  role: 'admin' | 'programmer' | 'user'; // roles del sistema

  github?: string;            // enlace a GitHub
  linkedin?: string;          // enlace a LinkedIn
  portfolio?: string;         // enlace a portafolio personal

  createdAt: number;          // timestamp de creación
}
