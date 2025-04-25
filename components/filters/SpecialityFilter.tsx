"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SpecialtyFilterProps {
  specialties: string[]
  selected: string[]
  onChange: (value: string) => void
}

export default function SpecialtyFilter({ specialties, selected, onChange }: SpecialtyFilterProps) {
  if (!specialties || specialties.length === 0) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800" data-testid="filter-header-speciality">
          Speciality
        </h3>
        <p className="text-sm text-gray-500">No specialties available</p>
      </div>
    )
  }

  return (
    <div className="mb-6">
      <h3 
        className="text-lg font-medium mb-3 text-gray-800" 
        data-testid="filter-header-speciality"
      >
        Speciality
      </h3>
      <ScrollArea className="h-64 rounded-md border p-2">
        <div className="flex flex-col gap-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={`specialty-${specialty}`}
                checked={selected.includes(specialty)}
                onCheckedChange={(checked) => onChange(specialty)}
                data-testid={`filter-specialty-${specialty.toLowerCase().replace(/\s+|\/+/g, '-')}`}
              />
              <Label
                htmlFor={`specialty-${specialty}`}
                className="cursor-pointer text-sm"
              >
                {specialty}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}