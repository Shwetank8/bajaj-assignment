import DoctorCard from "./DoctorCard"
import { Doctor } from "@/lib/types"

interface DoctorListProps {
  doctors: Doctor[]
}

export default function DoctorList({ doctors }: DoctorListProps) {
  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-medium text-gray-800">No doctors found</h3>
        <p className="text-gray-600 mt-2">Try adjusting your filters or search criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  )
}