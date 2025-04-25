"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SortFilterProps {
  selected: 'fees' | 'experience' | null
  onChange: (value: 'fees' | 'experience' | null) => void
}

export default function SortFilter({ selected, onChange }: SortFilterProps) {
  return (
    <div className="mb-6">
      <h3 
        className="text-lg font-medium mb-3 text-gray-800" 
        data-testid="filter-header-sort"
      >
        Sort By
      </h3>
      <RadioGroup 
        value={selected || ""}
        onValueChange={(value) => onChange(value as 'fees' | 'experience')}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="fees" 
            id="sort-fees" 
            data-testid="sort-fees"
          />
          <Label htmlFor="sort-fees" className="cursor-pointer">
            Fees (Low to High)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="experience" 
            id="sort-experience" 
            data-testid="sort-experience"
          />
          <Label htmlFor="sort-experience" className="cursor-pointer">
            Experience (High to Low)
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}