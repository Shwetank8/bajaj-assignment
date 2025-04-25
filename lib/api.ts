import { Doctor } from './types';

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch doctors: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const doctors = data.map((doctor: any) => ({
      ...doctor,
      specialities: Array.isArray(doctor.specialities) ? doctor.specialities : [],
      languages: Array.isArray(doctor.languages) ? doctor.languages : [],
      inClinic: Boolean(doctor.in_clinic),
      videoCon: Boolean(doctor.video_consult),
      experience: doctor.experience || 'Not specified',
      fees: doctor.fees || 'Not specified',
      ratings: Number(doctor.ratings) || 0,
      photo: String(doctor.photo) || 'https://via.placeholder.com/150',
      location: doctor.clinic?.name || 'Unknown',
    }));

    return doctors;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}
