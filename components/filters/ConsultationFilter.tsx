"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ConsultationFilterProps {
  selected: string | null
  onChange: (value: string) => void
}

export default function ConsultationFilter({ selected, onChange }: ConsultationFilterProps) {
  return (
    <div className="mb-6">
      <h3 
        className="text-lg font-medium mb-3 text-gray-800" 
        data-testid="filter-header-moc"
      >
        Consultation Mode
      </h3>
      <RadioGroup 
        value={selected || ""} 
        onValueChange={onChange}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="Video Consult" 
            id="video-consult" 
            data-testid="filter-video-consult"
          />
          <Label htmlFor="video-consult" className="cursor-pointer">Video Consult</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="In Clinic" 
            id="in-clinic" 
            data-testid="filter-in-clinic"
          />
          <Label htmlFor="in-clinic" className="cursor-pointer">In Clinic</Label>
        </div>
      </RadioGroup>
    </div>
  )
}