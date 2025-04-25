export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: { name: string }[];
  fees: string;
  experience: string;
  languages: string[];
  ratings?: number;
  location: string;
  inClinic: boolean;
  videoCon: boolean;
  clinic?: any; // or define it properly
}

  export interface FilterState {
    search: string;
    consultationMode: string | null;
    specialties: string[];
    sortBy: 'fees' | 'experience' | null;
  }