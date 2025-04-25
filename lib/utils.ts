import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Doctor, FilterState } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUniqueSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialty.forEach(specialty => {
      specialtiesSet.add(specialty);
    });
  });
  
  return Array.from(specialtiesSet).sort();
}

export function filterDoctors(doctors: Doctor[], filters: FilterState): Doctor[] {
  if (!doctors) return [];
  
  return doctors.filter(doctor => {
    // Filter by search term
    if (filters.search && doctor.name && !doctor.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Filter by consultation mode
    if (filters.consultationMode && doctor.consultationMode && 
        Array.isArray(doctor.consultationMode) && 
        !doctor.consultationMode.includes(filters.consultationMode as 'Video Consult' | 'In Clinic')) {
      return false;
    }
    
    // Filter by specialties (if any selected)
    if (filters.specialties.length > 0 && doctor.specialty && Array.isArray(doctor.specialty)) {
      const hasMatchingSpecialty = doctor.specialty.some(specialty => 
        filters.specialties.includes(specialty)
      );
      if (!hasMatchingSpecialty) {
        return false;
      }
    }
    
    return true;
  });
}

export function sortDoctors(doctors: Doctor[], sortBy: 'fees' | 'experience' | null): Doctor[] {
  if (!doctors || !sortBy) return doctors || [];
  
  return [...doctors].sort((a, b) => {
    if (sortBy === 'fees') {
      return (a.fee || 0) - (b.fee || 0); // ascending
    } else if (sortBy === 'experience') {
      return (b.experience || 0) - (a.experience || 0); // descending
    }
    return 0;
  });
}

export function urlParamsToFilterState(searchParams: URLSearchParams): FilterState {
  return {
    search: searchParams.get('search') || '',
    consultationMode: searchParams.get('mode'),
    specialties: searchParams.getAll('specialty'),
    sortBy: (searchParams.get('sortBy') as 'fees' | 'experience' | null) || null
  };
}

export function filterStateToUrlParams(filterState: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  
  if (filterState.search) {
    params.set('search', filterState.search);
  }
  
  if (filterState.consultationMode) {
    params.set('mode', filterState.consultationMode);
  }
  
  filterState.specialties.forEach(specialty => {
    params.append('specialty', specialty);
  });
  
  if (filterState.sortBy) {
    params.set('sortBy', filterState.sortBy);
  }
  
  return params;
}