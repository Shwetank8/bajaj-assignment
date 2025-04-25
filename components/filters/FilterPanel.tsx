"use client"

import { Separator } from "@/components/ui/separator"
import ConsultationFilter from "./ConsultationFilter"
import SpecialtyFilter from "./SpecialityFilter"
import SortFilter from "./SortFilter"
import { FilterState } from "../../lib/types"

interface FilterPanelProps {
  specialties: string[]
  filters: FilterState
  onConsultationChange: (value: string) => void
  onSpecialtyChange: (value: string) => void
  onSortChange: (value: 'fees' | 'experience' | null) => void
}

export default function FilterPanel({
  specialties,
  filters,
  onConsultationChange,
  onSpecialtyChange,
  onSortChange
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Filters</h2>
      
      <ConsultationFilter 
        selected={filters.consultationMode} 
        onChange={onConsultationChange} 
      />
      
      <Separator className="my-4" />
      
      <SpecialtyFilter 
        specialties={specialties} 
        selected={filters.specialties} 
        onChange={onSpecialtyChange} 
      />
      
      <Separator className="my-4" />
      
      <SortFilter 
        selected={filters.sortBy} 
        onChange={onSortChange} 
      />
    </div>
  )
}